import Database from "@api/database/Database";
import {
	prepareDataForInsert,
	prepareDataForUpdate,
} from "@api/database/utils";
import IEntityBase from "@core/_shared/model/IEntityBase";
import Receipt_Recurring from "@core/receipt/model/Receipt_Recurring";
import IRepositoryReceipt_Recurring, {
	RepositoryReceipt_RecurringRegisterParam,
} from "@core/receipt/ports/IRepositoryReceipt_Recurring";

// REVIEW: Talvez exista uma forma de generalizar para mais casos
type Receipt_RecurringDatabaseModel = StrictOmit<
	Receipt_Recurring, "transfer_method_type" | "tag" | "scheduled_at"
	| "id" | "recurrence_type" | "was_processed" | "is_disabled"
> & {
	fk_id_transfer_method_type: IEntityBase["id"];
	fk_id_tag: IEntityBase["id"];
	scheduled_at: string;
};

export class RepositoryReceipt_RecurringSQLite extends IRepositoryReceipt_Recurring {
	constructor(protected db: Database) {
		super(db);
	}
	protected get_id_fk_base_item_value_column(item_value_id: Receipt_Recurring["id"]): Receipt_Recurring["id"] {
		return this.get_fk_id_base_item_value("recurring_item_value", item_value_id)
	}

	async register(entity: RepositoryReceipt_RecurringRegisterParam): Promise<Receipt_Recurring | undefined> {
		return new Promise(async (resolve, reject) => {
			try {
				const fk_id_transfer_method_type = this.get_id_transfer_method_type(entity.transfer_method_type);
				const fk_id_tag = this.get_id_tag(entity.tag);
				const fk_id_recurrence_type = this.get_id_recurrence_type(entity.recurrence_type);

				const {
					transfer_method_type,
					tag,
					scheduled_at,
					recurrence_type,
					...entityWithoutFkAttributes
				} = entity;

				const dataForInsert: Receipt_RecurringDatabaseModel = {
					...entityWithoutFkAttributes,
					scheduled_at: scheduled_at.toISOString().split("T")[0],
					fk_id_transfer_method_type,
					fk_id_tag,
					type: this.default_receipt_type,
				};

				await this.db.instance.withExclusiveTransactionAsync(async (txn) => {
					const [query_base, values_base] = prepareDataForInsert<Receipt_RecurringDatabaseModel>("base_item_value",dataForInsert);

					// insert into base_item_value
					const stmt_base_item_value = await txn.prepareAsync(query_base);
					const result_insert_base = await stmt_base_item_value.executeAsync(values_base);
					await stmt_base_item_value.finalizeAsync();

					// Não preciso passar atributo is_disabled
					// porque por padrão o banco já cria o registro com valor false

					const data_recurrence = {
						fk_id_recurrence_type,
						fk_id_base_item_value: result_insert_base.lastInsertRowId,
					};

					const [query_recurrence, values_recurrence] = prepareDataForInsert<typeof data_recurrence>("recurring_item_value", data_recurrence);
					const stmt_recurring_item_value = await txn.prepareAsync(query_recurrence);
					const result_insert_in_recurring_item_value = await stmt_recurring_item_value.executeAsync(values_recurrence);
					await stmt_recurring_item_value.finalizeAsync();

					const last_insert_rowid = result_insert_in_recurring_item_value.lastInsertRowId;

					resolve({
						...entity,
						id: last_insert_rowid,
						was_processed: false,
						type: this.default_receipt_type,
						is_disabled: false,
					});
				});
			} catch (error) {
				if (error instanceof Error) {
					console.log("Erro ao marcar como executado:", error.message);
				}
				reject(undefined);
			}
		});
	}

	async findById(id: Receipt_Recurring["id"]): Promise<Receipt_Recurring | undefined> {
		const SQL = `SELECT riv.id, biv.description, biv.type, biv.scheduled_at,
		biv.amount, biv.was_processed, t.description as tag, tmt.name as transfer_method_type,
		biv.created_at, biv.updated_at, riv.is_disabled, rt.type as recurrence_type
		FROM recurring_item_value riv
		JOIN base_item_value biv ON riv.fk_id_base_item_value = biv.id
		JOIN recurrence_type rt ON riv.fk_id_recurrence_type = rt.id
		JOIN tag t ON biv.fk_id_tag = t.id
		JOIN transfer_method_type tmt ON biv.fk_id_transfer_method_type = tmt.id
		WHERE riv.id = ?;
        `;

		const stmt = await this.db.instance.prepareAsync(SQL);
		const result = await stmt.executeAsync<Receipt_Recurring>([id]);
		const receipt_recurring = await result.getFirstAsync();
		await stmt.finalizeAsync();

		if (!receipt_recurring) return undefined;

		return {
			...receipt_recurring,
			scheduled_at: new Date(receipt_recurring.scheduled_at),
			was_processed: Boolean(receipt_recurring.was_processed),
			is_disabled: Boolean(receipt_recurring.is_disabled),
		};
	}

	async findAll(): Promise<Receipt_Recurring[]> {
		const SQL = `SELECT riv.id, biv.description, biv.type, biv.scheduled_at,
		biv.amount, biv.was_processed, t.description as tag, tmt.name as transfer_method_type,
		biv.created_at, biv.updated_at, riv.is_disabled, rt.type as recurrence_type
		FROM recurring_item_value riv
		JOIN base_item_value biv ON riv.fk_id_base_item_value = biv.id
		JOIN recurrence_type rt ON riv.fk_id_recurrence_type = rt.id
		JOIN tag t ON biv.fk_id_tag = t.id
		JOIN transfer_method_type tmt ON biv.fk_id_transfer_method_type = tmt.id;
		`;
		const receipts_recurrence: Array<Receipt_Recurring> =
			await this.db.instance.getAllAsync<Receipt_Recurring>(SQL);

		return receipts_recurrence.map((receipt_recurring) => {
			return {
				...receipt_recurring,
				scheduled_at: new Date(receipt_recurring.scheduled_at),
				// Em SQLite não existe o tipo boolean, então
				// precisamos usar o 'double negation operator'
				// (!!0 == true) para converter o valor para boolean,
				// ou também o utilitário da linguagem como mostrado abaixo
				was_processed: Boolean(receipt_recurring.was_processed),
				is_disabled: Boolean(receipt_recurring.is_disabled),
			};
		});
	}

	async update(entity: Receipt_Recurring): Promise<Receipt_Recurring | undefined> {
		return new Promise(async (resolve, reject) => {
			try {
				const fk_id_base_item_value = this.get_id_fk_base_item_value_column(entity.id);
				const fk_id_transfer_method_type = this.get_id_transfer_method_type(entity.transfer_method_type);
				const fk_id_tag = this.get_id_tag(entity.tag);
				const fk_id_recurrence_type = this.get_id_recurrence_type(entity.recurrence_type);

				// Para fazer um rollback basta lançar um Erro dentro da função
				await this.db.instance.withExclusiveTransactionAsync(async (txn) => {
					const {
						id, transfer_method_type,
						tag, recurrence_type,
						is_disabled, ...rest
					} = entity;

					const dataForUpdate = {
						...rest,
						fk_id_tag,
						fk_id_transfer_method_type,
						scheduled_at: entity.scheduled_at.toISOString().split("T")[0],
					};

					const [query, values] = prepareDataForUpdate<Receipt_RecurringDatabaseModel,Receipt_Recurring["id"]>("base_item_value", dataForUpdate, fk_id_base_item_value);
					const statement = await txn.prepareAsync(query);
					await statement.executeAsync(values);
					await statement.finalizeAsync();

					// Atualiza valores na tabela de recurring_item_value
					const data_recurrence = {
						is_disabled,
						fk_id_recurrence_type,
						fk_id_base_item_value,
					};
					const [query_recurrence, values_recurrence] = prepareDataForUpdate<typeof data_recurrence,Receipt_Recurring["id"]>("recurring_item_value", data_recurrence, entity.id);
					const stmt_recurring_item_value = await txn.prepareAsync(query_recurrence);
					await stmt_recurring_item_value.executeAsync(values_recurrence);
					await stmt_recurring_item_value.finalizeAsync();
				});
				resolve(entity);
			} catch (error) {
				if (error instanceof Error) {
					console.log("Erro ao atualizar:", error.message);
				}
				reject(undefined);
			}
		});
	}

	async delete(id: Receipt_Recurring["id"]): Promise<boolean> {
		return new Promise(async (resolve, reject) => {
			try {
				const fk_id_base_item_value = this.get_id_fk_base_item_value_column(id);

				var removed = false;
				await this.db.instance.withExclusiveTransactionAsync(async (txn) => {
					const query = `DELETE FROM base_item_value WHERE id = ?`;

					const statement = await txn.prepareAsync(query);
					const result = await statement.executeAsync([fk_id_base_item_value]);
					removed = result.changes > 0;
					await statement.finalizeAsync();
				});
				resolve(removed);
			} catch (error) {
				if (error instanceof Error) {
					console.log("Erro ao marcar como executado:", error.message);
				}
				reject(false);
			}
		});
	}
}
