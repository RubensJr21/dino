import Database from "@api/database/Database";
import {
	prepareDataForInsert,
	prepareDataForUpdate,
} from "@api/database/utils";
import Receipt from "@core/receipt/model/Receipt";
import IRepositoryReceipt from "@core/receipt/ports/IRepositoryReceipt";
import { RepositoryReceipt_BaseRegisterParam } from "@core/receipt/ports/IRepositoryReceipt_Base";

// REVIEW: Talvez exista uma forma de generalizar para mais casos
type ReceiptDatabaseModel = StrictOmit<
	Receipt,
	"transfer_method_type" | "tag" | "scheduled_at" | "id" | "was_processed"
> & {
	fk_id_transfer_method_type: number;
	fk_id_tag: number;
	scheduled_at: string;
};

export class RepositoryReceiptSQLite extends IRepositoryReceipt {
	constructor(protected db: Database) {
		super(db);
	}
	protected get_id_fk_base_item_value_column(item_value_id: Receipt["id"]): Receipt["id"] {
		return this.get_fk_id_base_item_value("item_value", item_value_id)
	}

	async register(entity: RepositoryReceipt_BaseRegisterParam): Promise<Receipt | undefined> {
		return new Promise(async (resolve, reject) => {
			try {
				const fk_id_transfer_method_type = this.get_id_transfer_method_type(entity.transfer_method_type);
				const fk_id_tag = this.get_id_tag(entity.tag);

				const {
					transfer_method_type,
					tag,
					scheduled_at,
					...entityWithoutFkAttributes
				} = entity;

				const dataForInsert: ReceiptDatabaseModel = {
					...entityWithoutFkAttributes,
					scheduled_at: scheduled_at.toISOString().split("T")[0],
					fk_id_transfer_method_type,
					fk_id_tag,
					type: this.default_receipt_type,
				};

				await this.db.instance.withExclusiveTransactionAsync(async (txn) => {
					const [query, values] = prepareDataForInsert<ReceiptDatabaseModel>("base_item_value",dataForInsert);

					// insert into base_item_value
					const statement_base_item_value = await txn.prepareAsync(query);
					const result_insert_in_base_item_value = await statement_base_item_value.executeAsync(values);
					await statement_base_item_value.finalizeAsync();

					// create as item_value
					const fk_id_base_item_value = result_insert_in_base_item_value.lastInsertRowId;
					const data_item_value = {
						fk_id_base_item_value,
					};

					const [query_recurrence, values_recurrence] = prepareDataForInsert<typeof data_item_value>("item_value", data_item_value);
					const statement_item_value = await txn.prepareAsync(query_recurrence);
					const result_insert_item_value = await statement_item_value.executeAsync(values_recurrence);
					await statement_item_value.finalizeAsync();

					const last_insert_rowid = result_insert_item_value.lastInsertRowId;

					resolve({
						...entity,
						id: last_insert_rowid,
						was_processed: false,
						type: this.default_receipt_type,
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

	async findById(id: Receipt["id"]): Promise<Receipt | undefined> {
		const SQL = `SELECT iv.id, biv.description, biv.type, biv.scheduled_at,
			biv.amount, biv.was_processed, t.description as tag, tmt.name as transfer_method_type,
			biv.created_at, biv.updated_at
			FROM item_value iv
			JOIN base_item_value biv ON iv.fk_id_base_item_value = biv.id
			JOIN tag t ON biv.fk_id_tag = t.id
			JOIN transfer_method_type tmt ON biv.fk_id_transfer_method_type = tmt.id
			WHERE iv.id = ?
			;
		`;

		const statement = await this.db.instance.prepareAsync(SQL);
		const result = await statement.executeAsync<Receipt>([id]);
		const receipt = await result.getFirstAsync();
		await statement.finalizeAsync();

		if (!receipt) return undefined;

		return {
			...receipt,
			scheduled_at: new Date(receipt.scheduled_at),
			was_processed: Boolean(receipt.was_processed),
		};
	}

	async findAll(): Promise<Receipt[]> {
		const SQL = `SELECT biv.id, biv.description, biv.type, biv.scheduled_at,
		biv.amount, biv.was_processed, t.description as tag, tmt.name as transfer_method_type,
		biv.created_at, biv.updated_at
		FROM item_value iv
		JOIN base_item_value biv ON iv.fk_id_base_item_value = biv.id
		JOIN tag t ON biv.fk_id_tag = t.id
		JOIN transfer_method_type tmt ON biv.fk_id_transfer_method_type = tmt.id;
		`;
		const receipts: Array<Receipt> = await this.db.instance.getAllAsync<Receipt>(SQL);

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

	async update(entity: Receipt): Promise<Receipt | undefined> {
		return new Promise(async (resolve, reject) => {
			try {
				const fk_id_base_item_value = this.get_id_fk_base_item_value_column(entity.id);
				const fk_id_transfer_method_type = this.get_id_transfer_method_type(entity.transfer_method_type);
				const fk_id_tag = this.get_id_tag(entity.tag);

				await this.db.instance.withExclusiveTransactionAsync(async (txn) => {
					const { id, transfer_method_type, tag, ...rest } = entity;

					const scheduled_at = entity.scheduled_at.toISOString().split("T")[0];

					const dataForUpdate = {
						...rest,
						fk_id_tag,
						fk_id_transfer_method_type,
						scheduled_at,
					};

					const [query, values] = prepareDataForUpdate<ReceiptDatabaseModel,Receipt["id"]>("base_item_value", dataForUpdate, fk_id_base_item_value);
					const statement = await txn.prepareAsync(query);
					await statement.executeAsync(values);
					await statement.finalizeAsync();
				});
				resolve(entity);
			} catch (error) {
				if (error instanceof Error)
					console.log("Erro ao atualizar:", error.message);
				reject(undefined);
			}
		});
	}

	async delete(id: Receipt["id"]): Promise<boolean> {
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
