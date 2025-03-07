import IRepository, {
	RepositoryRegisterParam,
} from "@/api/core/_shared/ports/IRepository";
import Receipt from "@core/receipt/model/Receipt";

export type RegisterReceiptDTO = StrictOmit<
	RepositoryRegisterParam<Receipt>,
	"type" | "was_processed"
>;

export const receiptType = "Entrada";

export default interface IRepositoryReceipt extends IRepository<Receipt> {
	mark_receipt_as_executed(id: Receipt["id"]): Promise<Receipt | undefined>;
}
