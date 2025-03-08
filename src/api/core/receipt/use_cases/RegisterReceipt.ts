import IUseCase from "@/api/core/_shared/IUseCase";
import RepositoryReceipt, {
	RepositoryReceiptRegisterParam,
} from "@/api/core/receipt/ports/IRepositoryReceipt_Base";
import Receipt from "@core/receipt/model/Receipt";

export default class RegisterReceipt
	implements IUseCase<RepositoryReceiptRegisterParam, Receipt>
{
	constructor(
		private repository: RepositoryReceipt<
			Receipt,
			RepositoryReceiptRegisterParam
		>
	) {}
	async execute(
		input: RepositoryReceiptRegisterParam
	): Promise<Receipt | undefined> {
		return await this.repository.register(input);
	}
}
