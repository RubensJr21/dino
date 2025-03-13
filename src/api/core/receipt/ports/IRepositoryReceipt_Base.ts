import Database from "@api/database/Database";
import IRepository, {
	RepositoryRegisterParam,
} from "@core/_shared/ports/IRepository";
import IRepository_Base_ItemValue from "@core/_shared/ports/IRepository_Base_ItemValue";
import Receipt from "@core/receipt/model/Receipt";

export type RepositoryReceipt_BaseRegisterParam = RepositoryRegisterParam<
	Receipt,
	"id" | "type" | "was_processed"
>;

export type RepositoryReceiptRegisterParam<
	T extends Receipt,
	K extends keyof T
> = RepositoryRegisterParam<T, "id" | "type" | "was_processed" | K>;

export default abstract class IRepositoryReceipt_Base<
		T extends Receipt,
		RegisterType
	>
	extends IRepository_Base_ItemValue<T>
	implements IRepository<T, RegisterType>
{
	protected default_receipt_type: string = "Entrada";

	constructor(db: Database) {
		super(db);
	}

	abstract register(entityForRegister: RegisterType): Promise<T | undefined>;
	abstract findById(id: Receipt["id"]): Promise<T | undefined>;
	abstract findAll(): Promise<T[]>;
	abstract update(entity: T): Promise<T | undefined>;
	abstract delete(id: T["id"]): Promise<boolean>;
}
