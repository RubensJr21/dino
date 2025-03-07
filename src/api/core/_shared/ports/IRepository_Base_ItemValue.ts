import Database from "@/api/database/Database";
import { prepareDataForInsert } from "@/api/database/utils";
import { withObject } from "@/utils/objectHelpers";

interface IEntityBase {
	id: number;
}

interface Base_ItemValue extends IEntityBase {
	description: string;
	type: string;
	scheduled_at: Date;
	amount: number;
	was_processed: boolean;
	// fk_id_transfer_method: number;
	transfer_method_type: string;
	// fk_id_tag: number;
	tag: string;
}

interface Receipt extends Base_ItemValue {}

type StrictOmit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

type RepositoryRegisterParam<
	T extends IEntityBase,
	K extends keyof T
> = StrictOmit<T, K>;

interface IRepository<ENTITY extends IEntityBase, RegisterType> {
	register(entityForRegister: RegisterType): Promise<ENTITY | undefined>;
	findById(id: ENTITY["id"]): Promise<ENTITY | undefined>;
	findAll(): Promise<ENTITY[]>;
	update(entity: ENTITY): Promise<ENTITY | undefined>;
	delete(id: ENTITY["id"]): Promise<boolean>;
}

interface IRepository_Base_ItemValue<T extends IEntityBase> {
	mark_receipt_as_processed(id: T["id"]): Promise<T | undefined>;
}

export abstract class IRepositoryReceipt_Base<T extends Receipt, RegisterType>
	implements IRepository<T, RegisterType>, IRepository_Base_ItemValue<T>
{
	protected type: string = "Entrada";
	protected abstract db: Database;

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
	): Base_ItemValue["id"] | undefined {
		type type_export = { fk_id_base_item_value: Base_ItemValue["id"] };
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

	abstract register(entityForRegister: RegisterType): Promise<T | undefined>;

	abstract findById(id: Receipt["id"]): Promise<T | undefined>;
	abstract findAll(): Promise<T[]>;
	abstract update(entity: T): Promise<T | undefined>;
	abstract delete(id: T["id"]): Promise<boolean>;
	abstract mark_receipt_as_processed(id: T["id"]): Promise<T | undefined>;
}

type RepositoryReceiptRegisterParam = RepositoryRegisterParam<Receipt, "id">;

export class RepositoryReceipt extends IRepositoryReceipt_Base<
	Receipt,
	RepositoryReceiptRegisterParam
> {
	register(
		entityForRegister: RepositoryReceiptRegisterParam
	): Promise<Receipt | undefined> {
		type ReceiptDatabaseModel = StrictOmit<
			Receipt,
			"transfer_method_type" | "tag" | "scheduled_at" | "id"
		> & {
			fk_id_transfer_method_type: number;
			fk_id_tag: number;
			scheduled_at: string;
		};

		return new Promise(async (resolve, reject) => {
			try {
				const fk_id_transfer_method_type = this.get_id_from_receipt_fk_column(
					"transfer_method_type",
					entityForRegister.transfer_method_type,
					"name"
				);

				if (fk_id_transfer_method_type === undefined) {
					throw new Error("Transfer method type not found");
				}

				const fk_id_tag = this.get_id_from_receipt_fk_column(
					"tag",
					entityForRegister.tag,
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
				} = entityForRegister;

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
						...entityForRegister,
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
	findById(id: Receipt["id"]): Promise<Receipt | undefined> {
		throw new Error("Method not implemented.");
	}
	findAll(): Promise<Receipt[]> {
		throw new Error("Method not implemented.");
	}
	update(entity: Receipt): Promise<Receipt | undefined> {
		throw new Error("Method not implemented.");
	}
	delete(id: Receipt["id"]): Promise<boolean> {
		throw new Error("Method not implemented.");
	}
	mark_receipt_as_processed(id: Receipt["id"]): Promise<Receipt | undefined> {
		throw new Error("Method not implemented.");
	}
	constructor(protected db: Database) {
		super();
		this.db = db;
	}
}

interface Receipt_Recurring extends Receipt {
	is_disabled: boolean;
}

type RepositoryReceipt_RecurringRegisterParam = RepositoryRegisterParam<
	Receipt_Recurring,
	"id" | "is_disabled"
>;

export class RepositoryReceipt_Recurring extends IRepositoryReceipt_Base<
	Receipt_Recurring,
	RepositoryReceipt_RecurringRegisterParam
> {
	register(
		entityForRegister: RepositoryReceipt_RecurringRegisterParam
	): Promise<Receipt_Recurring | undefined> {
		throw new Error("Method not implemented.");
	}
	findById(
		id: Receipt_Recurring["id"]
	): Promise<Receipt_Recurring | undefined> {
		throw new Error("Method not implemented.");
	}
	findAll(): Promise<Receipt_Recurring[]> {
		throw new Error("Method not implemented.");
	}
	update(entity: Receipt_Recurring): Promise<Receipt_Recurring | undefined> {
		throw new Error("Method not implemented.");
	}
	delete(id: Receipt_Recurring["id"]): Promise<boolean> {
		throw new Error("Method not implemented.");
	}
	mark_receipt_as_processed(
		id: Receipt_Recurring["id"]
	): Promise<Receipt_Recurring | undefined> {
		throw new Error("Method not implemented.");
	}
	constructor(protected db: Database) {
		super();
		this.db = db;
	}
}

// Implementar em uma nova branch

var db = new Database();

var r = new RepositoryReceipt_Recurring(db);
