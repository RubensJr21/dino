import Database from "@/api/database/Database";
import { RepositoryRegisterParam } from "../../_shared/ports/IRepository";
import Receipt_Recurring from "../model/Receipt_Recurring";
import IRepositoryReceipt_Base from "./IRepositoryReceipt_Base";

export type RepositoryReceipt_RecurringRegisterParam = RepositoryRegisterParam<
	Receipt_Recurring,
	"id" | "is_disabled"
>;

export default abstract class RepositoryReceipt_Recurring extends IRepositoryReceipt_Base<
	Receipt_Recurring,
	RepositoryReceipt_RecurringRegisterParam
> {
	protected default_is_disabled: boolean = false;

	constructor(protected db: Database) {
		super();
	}
	abstract register(
		entityForRegister: RepositoryReceipt_RecurringRegisterParam
	): Promise<Receipt_Recurring | undefined>;
	abstract findById(
		id: Receipt_Recurring["id"]
	): Promise<Receipt_Recurring | undefined>;
	abstract findAll(): Promise<Receipt_Recurring[]>;
	abstract update(
		entity: Receipt_Recurring
	): Promise<Receipt_Recurring | undefined>;
	abstract delete(id: Receipt_Recurring["id"]): Promise<boolean>;
	abstract mark_receipt_as_processed(
		id: Receipt_Recurring["id"]
	): Promise<Receipt_Recurring | undefined>;
}
