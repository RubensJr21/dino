import IUseCase from "@core/_shared/IUseCase";
import Receipt from "@core/receipt/model/Receipt";
import RepositoryReceipt from "@core/receipt/ports/IRepositoryReceipt";

export default class MarkReceiptAsProcessed
	implements IUseCase<Receipt["id"], Receipt | undefined>
{
	constructor(private repository: RepositoryReceipt) {}
	async execute(input: Receipt["id"]): Promise<Receipt | undefined> {
		const receipt = await this.repository.findById(input);
		if (!receipt) return;
		receipt.was_processed = true;
		return await this.repository.update(receipt);
	}
}
