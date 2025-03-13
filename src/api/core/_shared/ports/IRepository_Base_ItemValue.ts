import Database from "@api/database/Database";
import Base_ItemValue from "@core/_shared/model/Base_ItemValue";

export default abstract class IRepository_Base_ItemValue<
	T extends Base_ItemValue
> {
	constructor(protected db: Database) {}
	protected abstract resolve_fk_column(
		search_table_name: string,
		column_value: string,
		target_column: string
	): T["id"];

	protected abstract get_id_fk_base_item_value_column(
		item_value_id: Base_ItemValue["id"]
	): Base_ItemValue["id"];

	protected get_id_transfer_method_type(
		value: T["transfer_method_type"]
	): Base_ItemValue["id"] {
		try {
			return this.resolve_fk_column("transfer_method_type", value, "name");
		} catch (error) {
			if (error instanceof Error)
				console.log("get_id_transfer_method_type() =>", error.message);
			throw new Error("Recurrence type not found");
		}
	}

	protected get_id_tag(value: T["tag"]): Base_ItemValue["id"] {
		try {
			return this.resolve_fk_column("tag", value, "description");
		} catch (error) {
			if (error instanceof Error) console.log("get_id_tag() =>", error.message);
			throw new Error("Recurrence type not found");
		}
	}
}
