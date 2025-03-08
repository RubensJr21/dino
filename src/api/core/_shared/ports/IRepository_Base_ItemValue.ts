import IEntityBase from "@api/core/_shared/model/IEntityBase";

export default abstract class IRepository_Base_ItemValue<
	T extends IEntityBase
> {
	protected default_was_processed: boolean = false;
	abstract mark_receipt_as_processed(id: T["id"]): Promise<T | undefined>;
	constructor() {}
}
