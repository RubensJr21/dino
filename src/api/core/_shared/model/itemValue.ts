import EntityBase from "./EntityBase";

export default interface ItemValue extends EntityBase {
	description: string;
	type: string;
	schedule_at: Date;
	amount: number;
	was_processed: boolean;
	// fk_id_transfer_method: string;
	transfer_method_type: string;
	// fk_id_tag: string;
	tag: string;
}
