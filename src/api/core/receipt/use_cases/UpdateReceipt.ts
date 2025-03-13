import IUseCase from "@core/_shared/IUseCase";
import Receipt from "@core/receipt/model/Receipt";
import RepositoryReceipt from "@core/receipt/ports/IRepositoryReceipt";

export default class UpdateReceipt
	implements IUseCase<Receipt, Receipt | undefined>
{
	constructor(private repository: RepositoryReceipt) {}
	async execute(input: Receipt): Promise<Receipt | undefined> {
		return await this.repository.update(input);
	}
}
