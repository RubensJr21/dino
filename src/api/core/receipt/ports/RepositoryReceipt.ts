import IRepository, {
	RegisterRepositoryDTO,
} from "@core/_shared/ports/RepositoryInterface";
import Receipt from "@core/receipt/model/Receipt";

export type RegisterReceiptDTO = RegisterRepositoryDTO<Receipt>;

export default interface RepositoryReceipt extends IRepository<Receipt> {
	mark_receipt_as_executed(id: Receipt["id"]): Promise<Receipt>;
}
