import IUseCase from "@core/_shared/IUseCase";
import Receipt_Recurring from "@core/receipt/model/Receipt_Recurring";
import RepositoryReceipt_Recurring, {
	RepositoryReceipt_RecurringRegisterParam,
} from "@core/receipt/ports/IRepositoryReceipt_Recurring";

export default class RegisterReceipt_Recurring
	implements
		IUseCase<
			RepositoryReceipt_RecurringRegisterParam,
			Receipt_Recurring | undefined
		>
{
	constructor(private repository: RepositoryReceipt_Recurring) {}
	async execute(
		input: RepositoryReceipt_RecurringRegisterParam
	): Promise<Receipt_Recurring | undefined> {
		return await this.repository.register(input);
	}
}
