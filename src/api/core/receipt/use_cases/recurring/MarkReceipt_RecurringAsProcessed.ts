import Receipt_Recurring from "@api/core/receipt/model/Receipt_Recurring";
import RepositoryReceipt_Recurring from "@api/core/receipt/ports/IRepositoryReceipt_Recurring";
import IUseCase from "@core/_shared/IUseCase";

export default class MarkReceipt_RecurringAsProcessed
	implements IUseCase<Receipt_Recurring["id"], Receipt_Recurring | undefined>
{
	constructor(private repository: RepositoryReceipt_Recurring) {}
	async execute(
		input: Receipt_Recurring["id"]
	): Promise<Receipt_Recurring | undefined> {
		const receipt_recurring = await this.repository.findById(input);
		if (!receipt_recurring) return;
		receipt_recurring.was_processed = true;
		return await this.repository.update(receipt_recurring);
	}
}
