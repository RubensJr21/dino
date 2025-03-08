import IRepository, {
	RepositoryRegisterParam,
} from "@/api/core/_shared/ports/IRepository";
import Database from "@/api/database/Database";
import { withObject } from "@/utils/objectHelpers";
import Receipt from "@core/receipt/model/Receipt";
import Base_ItemValue from "../../_shared/model/Base_ItemValue";
import IRepository_Base_ItemValue from "../../_shared/ports/IRepository_Base_ItemValue";

export type RepositoryReceiptRegisterParam = RepositoryRegisterParam<
	Receipt,
	"id" | "type" | "was_processed"
>;

export type ReceiptDatabaseModel = StrictOmit<
	Receipt,
	"transfer_method_type" | "tag" | "scheduled_at" | "id"
> & {
	fk_id_transfer_method_type: number;
	fk_id_tag: number;
	scheduled_at: string;
};

export default abstract class IRepositoryReceipt<
		T extends Receipt,
		RegisterType
	>
	extends IRepository_Base_ItemValue<T>
	implements IRepository<T, RegisterType>
{
	protected type: string = "Entrada";
	protected abstract db: Database;

	constructor() {
		super();
	}

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
