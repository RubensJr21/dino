import IUseCase from "@/api/core/_shared/IUseCase";
import RepositoryReceipt, {
	receiptType,
	RegisterReceiptDTO,
} from "@/api/core/receipt/ports/IRepositoryReceipt";
import Receipt from "@core/receipt/model/Receipt";

export default class RegisterReceipt
	implements IUseCase<RegisterReceiptDTO, Receipt>
{
	static readonly default_receipt_type = receiptType;
	static readonly default_was_processed = false;

	constructor(private repository: RepositoryReceipt) {}
	async execute(input: RegisterReceiptDTO): Promise<Receipt | undefined> {
		return await this.repository.register({
			...input,
			type: RegisterReceipt.default_receipt_type,
			was_processed: RegisterReceipt.default_was_processed,
		});
	}
}
