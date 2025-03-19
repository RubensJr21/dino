import Database from "@api/database/Database";
import Receipt from "@core/receipt/model/Receipt";
import IRepositoryReceipt_Base, {
	RepositoryReceipt_BaseRegisterParam,
} from "./IRepositoryReceipt_Base";

export default abstract class IRepositoryReceipt extends IRepositoryReceipt_Base<
	Receipt,
	RepositoryReceipt_BaseRegisterParam
> {
	constructor(db: Database) {
		super(db);
	}
	abstract register(
		entityForRegister: RepositoryReceipt_BaseRegisterParam
	): Promise<Receipt | undefined>;

	abstract findById(id: Receipt["id"]): Promise<Receipt | undefined>;
	abstract findAll(): Promise<Receipt[]>;
	abstract update(entity: Receipt): Promise<Receipt | undefined>;
	abstract delete(id: Receipt["id"]): Promise<boolean>;
}
