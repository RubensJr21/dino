import IUseCase from "@core/_shared/IUseCase";
import Receipt from "@core/receipt/model/Receipt";
import RepositoryReceipt from "@core/receipt/ports/IRepositoryReceipt";

export default class FindAllReceipts implements IUseCase<void, Receipt[]> {
	constructor(private repository: RepositoryReceipt) {}
	async execute(): Promise<Receipt[]> {
		return await this.repository.findAll();
	}
}
