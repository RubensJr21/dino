import Receipt from "./Receipt";

export default interface Receipt_Recurring extends Receipt {
	is_disabled: boolean;
	// fk_id_recurrence_type: IEntityBase["id"]
	recurrence_type: string;
}
