import Database from "@/api/database/Database";
import Receipt from "../model/Receipt";
import IRepositoryReceipt_Base, {
	RepositoryReceiptRegisterParam,
} from "./IRepositoryReceipt_Base";

export default abstract class IRepositoryReceipt extends IRepositoryReceipt_Base<
	Receipt,
	RepositoryReceiptRegisterParam
> {
	constructor(protected db: Database) {
		super();
	}
	abstract register(
		entityForRegister: RepositoryReceiptRegisterParam
	): Promise<Receipt | undefined>;

	abstract findById(id: Receipt["id"]): Promise<Receipt | undefined>;
	abstract findAll(): Promise<Receipt[]>;
	abstract update(entity: Receipt): Promise<Receipt | undefined>;
	abstract delete(id: Receipt["id"]): Promise<boolean>;
	abstract mark_receipt_as_processed(
		id: Receipt["id"]
	): Promise<Receipt | undefined>;
}
