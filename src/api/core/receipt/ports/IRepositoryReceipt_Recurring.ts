import Database from "@api/database/Database";
import Receipt_Recurring from "@core/receipt/model/Receipt_Recurring";
import IRepositoryReceipt_Base, {
	RepositoryReceiptRegisterParam,
} from "@core/receipt/ports/IRepositoryReceipt_Base";

export type RepositoryReceipt_RecurringRegisterParam =
	RepositoryReceiptRegisterParam<Receipt_Recurring, "is_disabled">;

export default abstract class RepositoryReceipt_Recurring extends IRepositoryReceipt_Base<
	Receipt_Recurring,
	RepositoryReceipt_RecurringRegisterParam
> {
	constructor(db: Database) {
		super(db);
	}

	protected get_id_recurrence_type(
		value: Receipt_Recurring["recurrence_type"]
	) {
		const id = this.db.resolve_fk_column("recurrence_type", value, "type");
		if (id) {
			return id;
		} else {
			throw new Error("Recurrence type not found");
		}
	}

	abstract register(
		entity: RepositoryReceipt_RecurringRegisterParam
	): Promise<Receipt_Recurring | undefined>;
	abstract findById(
		id: Receipt_Recurring["id"]
	): Promise<Receipt_Recurring | undefined>;
	abstract findAll(): Promise<Receipt_Recurring[]>;
	abstract update(
		entity: Receipt_Recurring
	): Promise<Receipt_Recurring | undefined>;
	abstract delete(id: Receipt_Recurring["id"]): Promise<boolean>;
}
