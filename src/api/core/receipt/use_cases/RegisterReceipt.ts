import IUseCase from "@core/_shared/IUseCase";
import Receipt from "@core/receipt/model/Receipt";
import RepositoryReceipt from "@core/receipt/ports/IRepositoryReceipt";
import { RepositoryReceipt_BaseRegisterParam } from "@core/receipt/ports/IRepositoryReceipt_Base";

export default class RegisterReceipt
	implements IUseCase<RepositoryReceipt_BaseRegisterParam, Receipt | undefined>
{
	constructor(private repository: RepositoryReceipt) {}
	async execute(
		input: RepositoryReceipt_BaseRegisterParam
	): Promise<Receipt | undefined> {
		return await this.repository.register(input);
	}
}
