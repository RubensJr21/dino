import IEntityBase from "@/api/core/_shared/model/IEntityBase";
import Receipt_Recurring from "@/api/core/receipt/model/Receipt_Recurring";
import IRepositoryReceipt_Recurring, {
	RepositoryReceipt_RecurringRegisterParam,
} from "@/api/core/receipt/ports/IRepositoryReceipt_Recurring";
import Database from "@/api/database/Database";
import {
	prepareDataForInsert,
	prepareDataForUpdate,
} from "@/api/database/utils";

type Receipt_RecurringDatabaseModel = StrictOmit<
	Receipt_Recurring,
	"transfer_method_type" | "tag" | "scheduled_at" | "id" | "recurrence_type"
> & {
	fk_id_transfer_method_type: IEntityBase["id"];
	fk_id_tag: IEntityBase["id"];
	scheduled_at: string;
	fk_id_recurrence_type: IEntityBase["id"];
};

export class RepositoryReceipt_RecurringSQLite extends IRepositoryReceipt_Recurring {
	constructor(protected db: Database) {
		super(db);
	}

	async register(
		entity: RepositoryReceipt_RecurringRegisterParam
	): Promise<Receipt_Recurring | undefined> {
		return new Promise(async (resolve, reject) => {
			try {
				const fk_id_transfer_method_type = this.get_id_from_receipt_fk_column(
					"transfer_method_type",
					entity.transfer_method_type,
					"name"
				);

				if (fk_id_transfer_method_type === undefined) {
					throw new Error("Transfer method type not found");
				}

				const fk_id_tag = this.get_id_from_receipt_fk_column(
					"tag",
					entity.tag,
					"description"
				);

				if (fk_id_tag === undefined) {
					throw new Error("Tag not found");
				}

				// TODO: Buscar o id do recurrence_type

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
					// FIXME: trocar por implementação da recuperação do fk_id_recurrence
					fk_id_recurrence_type: 0,
					was_processed: this.default_was_processed,
					type: this.default_receipt_type,
					is_disabled: this.default_is_disabled,
				};

				await this.db.instance.withExclusiveTransactionAsync(async (txn) => {
					const { query, values } =
						prepareDataForInsert<Receipt_RecurringDatabaseModel>(
							"base_item_value",
							dataForInsert
						);

					// insert into base_item_value
					const statement_base_item_value = await txn.prepareAsync(query);

					const result_insert_in_base_item_value =
						await statement_base_item_value.executeAsync(values);

					await statement_base_item_value.finalizeAsync();

					// FIXME: Trocar para inserção em recurring_item_value
					// create as item_value
					const statement_item_value = await txn.prepareAsync(
						`INSERT INTO item_value (fk_id_base_item_value) VALUES (?)`
					);
					const result_insert_item_value =
						await statement_item_value.executeAsync([
							result_insert_in_base_item_value.lastInsertRowId,
						]);

					await statement_item_value.finalizeAsync();

					const last_insert_rowid = result_insert_item_value.lastInsertRowId;

					resolve({
						...entity,
						id: last_insert_rowid,
						was_processed: this.default_was_processed,
						type: this.default_receipt_type,
						is_disabled: this.default_is_disabled,
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

	async findById(
		id: Receipt_Recurring["id"]
	): Promise<Receipt_Recurring | undefined> {
		const query = `
                SELECT biv.id, biv.description, biv.type, biv.scheduled_at,
                biv.amount, biv.was_processed, t.description as tag, tmt.name as transfer_method_type,
                biv.created_at, biv.updated_at
                FROM base_item_value biv
                JOIN item_value iv ON biv.id = iv.id
                JOIN tag t ON biv.fk_id_tag = t.id
                JOIN transfer_method_type tmt ON biv.fk_id_transfer_method_type = tmt.id
                WHERE iv.fk_id_base_item_value = ?
                ;
            `;

		const statement = await this.db.instance.prepareAsync(query);

		const result = await statement.executeAsync<Receipt_Recurring>([id]);

		const receipt = await result.getFirstAsync();

		await statement.finalizeAsync();

		if (!receipt) return undefined;

		return {
			...receipt,
			scheduled_at: new Date(receipt.scheduled_at),
			was_processed: Boolean(receipt.was_processed),
		};
	}

	async findAll(): Promise<Receipt_Recurring[]> {
		const receipts: Array<Receipt_Recurring> = await this.db.instance
			.getAllAsync<Receipt_Recurring>(`
                SELECT biv.id, biv.description, biv.type, biv.scheduled_at,
                biv.amount, biv.was_processed, t.description as tag, tmt.name as transfer_method_type,
                biv.created_at, biv.updated_at
                FROM base_item_value biv
                JOIN item_value iv ON biv.id = iv.id
                JOIN tag t ON biv.fk_id_tag = t.id
                JOIN transfer_method_type tmt ON biv.fk_id_transfer_method_type = tmt.id;
            `);

		return receipts.map((receipt) => {
			return {
				...receipt,
				scheduled_at: new Date(receipt.scheduled_at),
				// Em SQLite não existe o tipo boolean, então
				// precisamos usar o 'double negation operator'
				// (!!0 == true) para converter o valor para boolean,
				// ou também o utilitário da linguagem como mostrado abaixo
				was_processed: Boolean(receipt.was_processed),
			};
		});
	}

	// FIXME: Trocar retorno para new Promise((resolve,reject) => {...})
	async update(
		entity: Receipt_Recurring
	): Promise<Receipt_Recurring | undefined> {
		const fk_id_base_item_value =
			this.get_value_from_receipt_fk_base_item_value_column(entity.id);

		if (fk_id_base_item_value === undefined) return undefined;

		const fk_id_transfer_method_type = this.get_id_from_receipt_fk_column(
			"transfer_method_type",
			entity.transfer_method_type,
			"name"
		);

		if (fk_id_transfer_method_type === undefined) return undefined;

		const fk_id_tag = this.get_id_from_receipt_fk_column(
			"tag",
			entity.tag,
			"description"
		);

		if (fk_id_tag === undefined) return undefined;

		// TODO: Buscar o id do recurrence_type

		try {
			// Para fazer um rollback basta lançar um Erro dentro da função
			await this.db.instance.withExclusiveTransactionAsync(async (txn) => {
				const { id, transfer_method_type, tag, recurrence_type, ...rest } =
					entity;

				const scheduled_at = entity.scheduled_at.toISOString().split("T")[0];

				const dataForUpdate = {
					...rest,
					fk_id_tag,
					fk_id_transfer_method_type,
					// FIXME: trocar por implementação da recuperação do fk_id_recurrence
					fk_id_recurrence_type: 0,
					scheduled_at,
				};

				const { query, values } = prepareDataForUpdate<
					Receipt_RecurringDatabaseModel,
					Receipt_Recurring["id"]
				>("base_item_value", dataForUpdate, fk_id_base_item_value);

				const statement = await txn.prepareAsync(query);

				await statement.executeAsync(values);
				await statement.finalizeAsync();
			});
		} catch (error) {
			if (error instanceof Error) {
				console.log("Erro ao atualizar:", error.message);
			}
		}
		return entity;
	}

	async delete(id: Receipt_Recurring["id"]): Promise<boolean> {
		return new Promise(async (resolve, reject) => {
			try {
				const fk_id_base_item_value =
					this.get_value_from_receipt_fk_base_item_value_column(id);

				if (fk_id_base_item_value === undefined) {
					throw new Error("Base item não encontrado");
				}
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

	async mark_receipt_as_processed(
		id: Receipt_Recurring["id"]
	): Promise<Receipt_Recurring | undefined> {
		return new Promise(async (resolve, reject) => {
			const fk_id_base_item_value =
				this.get_value_from_receipt_fk_base_item_value_column(id);

			try {
				if (fk_id_base_item_value === undefined) {
					throw new Error("Base item não encontrado");
				}
				// Para fazer um rollback basta lançar um Erro dentro da função
				await this.db.instance.withExclusiveTransactionAsync(async (txn) => {
					const query = `UPDATE base_item_value SET was_processed = 1 WHERE id = ?`;

					const statement = await txn.prepareAsync(query);
					await statement.executeAsync([fk_id_base_item_value]);
					await statement.finalizeAsync();
				});
				resolve(await this.findById(id));
			} catch (error) {
				if (error instanceof Error) {
					console.log("Erro ao marcar como executado:", error.message);
					reject(undefined);
				}
			}
		});
	}
}
