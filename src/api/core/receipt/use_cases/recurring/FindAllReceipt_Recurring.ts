import IUseCase from "@core/_shared/IUseCase";
import Receipt_Recurring from "@core/receipt/model/Receipt_Recurring";
import RepositoryReceipt_Recurring from "@core/receipt/ports/IRepositoryReceipt_Recurring";

export default class FindAllReceipts_Recurring
	implements IUseCase<void, Receipt_Recurring[]>
{
	constructor(private repository: RepositoryReceipt_Recurring) {}
	async execute(): Promise<Receipt_Recurring[]> {
		return await this.repository.findAll();
	}
}
