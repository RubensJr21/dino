import IUseCase from "@core/_shared/IUseCase";
import Receipt from "@core/receipt/model/Receipt";
import RepositoryReceipt from "@core/receipt/ports/IRepositoryReceipt";

export default class FindReceiptById
	implements IUseCase<Receipt["id"], Receipt | undefined>
{
	constructor(private repository: RepositoryReceipt) {}
	async execute(input: Receipt["id"]): Promise<Receipt | undefined> {
		return await this.repository.findById(input);
	}
}
