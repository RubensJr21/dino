import IUseCase from "@core/_shared/IUseCase";
import Receipt_Recurring from "@core/receipt/model/Receipt_Recurring";
import RepositoryReceipt_Recurring from "@core/receipt/ports/IRepositoryReceipt_Recurring";

export default class FindReceipt_RecurringById
	implements IUseCase<Receipt_Recurring["id"], Receipt_Recurring | undefined>
{
	constructor(private repository: RepositoryReceipt_Recurring) {}
	async execute(
		input: Receipt_Recurring["id"]
	): Promise<Receipt_Recurring | undefined> {
		return await this.repository.findById(input);
	}
}
