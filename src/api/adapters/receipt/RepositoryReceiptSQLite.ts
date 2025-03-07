import BaseItemValue from "@/api/core/_shared/model/Base_ItemValue";
import { RepositoryRegisterParam } from "@/api/core/_shared/ports/IRepository";
import Receipt from "@/api/core/receipt/model/Receipt";
import IRepositoryReceipt from "@/api/core/receipt/ports/IRepositoryReceipt";
import Database from "@/api/database/Database";
import {
	prepareDataForInsert,
	prepareDataForUpdate,
} from "@/api/database/utils";
import { withObject } from "@/utils/objectHelpers";

type ReceiptDatabaseModel = StrictOmit<
	Receipt,
	"transfer_method_type" | "tag" | "scheduled_at" | "id"
> & {
	fk_id_transfer_method_type: number;
	fk_id_tag: number;
	scheduled_at: string;
};

export class RepositoryReceiptSQLite implements IRepositoryReceipt {
	constructor(private db: Database) {}

	get_id_from_receipt_fk_column(
		search_table_name: string,
		value: string,
		target_column: string
	): number | undefined {
		return withObject(
			this.db.instance.prepareSync(
				`SELECT id FROM ${search_table_name} WHERE ${target_column} = ?`
			),
			(statement) => {
				const result = statement.executeSync<Receipt>([value]).getFirstSync();
				statement.finalizeSync();
				return result?.id;
			}
		);
	}

	get_value_from_receipt_fk_base_item_value_column(
		item_value_id: Receipt["id"]
	): BaseItemValue["id"] | undefined {
		type type_export = { fk_id_base_item_value: BaseItemValue["id"] };
		return withObject(
			this.db.instance.prepareSync(
				`SELECT fk_id_base_item_value FROM item_value WHERE id = ?`
			),
			(statement) => {
				const result = statement
					.executeSync<type_export>([item_value_id])
					.getFirstSync();
				statement.finalizeSync();

				return result?.fk_id_base_item_value ?? undefined;
			}
		);
	}

	async register(
		entity: RepositoryRegisterParam<Receipt>
	): Promise<Receipt | undefined> {
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
				};

				await this.db.instance.withExclusiveTransactionAsync(async (txn) => {
					const { query, values } = prepareDataForInsert<ReceiptDatabaseModel>(
						"base_item_value",
						dataForInsert
					);

					// insert into base_item_value
					const statement_base_item_value = await txn.prepareAsync(query);

					const result_insert_in_base_item_value =
						await statement_base_item_value.executeAsync(values);

					await statement_base_item_value.finalizeAsync();

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
		const receipts: Array<Receipt> = await this.db.instance
			.getAllAsync<Receipt>(`
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

	async update(entity: Receipt): Promise<Receipt | undefined> {
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

		try {
			// Para fazer um rollback basta lançar um Erro dentro da função
			await this.db.instance.withExclusiveTransactionAsync(async (txn) => {
				const { id, transfer_method_type, tag, ...rest } = entity;

				const scheduled_at = entity.scheduled_at.toISOString().split("T")[0];

				const dataForUpdate = {
					...rest,
					fk_id_tag,
					fk_id_transfer_method_type,
					scheduled_at,
				};

				const { query, values } = prepareDataForUpdate<
					ReceiptDatabaseModel,
					Receipt["id"]
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

	async delete(id: Receipt["id"]): Promise<boolean> {
		return new Promise(async (resolve, reject) => {
			try {
				const fk_id_base_item_value =
					this.get_value_from_receipt_fk_base_item_value_column(id);

				if (fk_id_base_item_value === undefined) {
					throw new Error("Base item não encontrado");
				}
				// Para fazer um rollback basta lançar um Erro dentro da função
				await this.db.instance.withExclusiveTransactionAsync(async (txn) => {
					const query = `DELETE FROM base_item_value WHERE id = ?`;

					const statement = await txn.prepareAsync(query);
					await statement.executeAsync([fk_id_base_item_value]);
					await statement.finalizeAsync();
				});
				resolve(true);
			} catch (error) {
				if (error instanceof Error) {
					console.log("Erro ao marcar como executado:", error.message);
				}
				reject(false);
			}
		});
	}

	async mark_receipt_as_executed(
		id: Receipt["id"]
	): Promise<Receipt | undefined> {
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
