import IUseCase from "@core/_shared/IUseCase";
import Receipt from "@core/receipt/model/Receipt";
import RepositoryReceipt from "@core/receipt/ports/IRepositoryReceipt";

export default class DeleteReceipt implements IUseCase<Receipt["id"], boolean> {
	constructor(private repository: RepositoryReceipt) {}
	async execute(input: Receipt["id"]): Promise<boolean> {
		return await this.repository.delete(input);
	}
}
