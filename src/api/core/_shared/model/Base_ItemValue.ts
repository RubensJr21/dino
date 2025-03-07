import IEntityBase from "./IEntityBase";

export default interface Base_ItemValue extends IEntityBase {
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
