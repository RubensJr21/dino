import IUseCase from "@core/_shared/UseCaseInterface";
import Receipt from "@core/receipt/model/Receipt";
import RepositoryReceipt, {
	RegisterReceiptDTO,
} from "@core/receipt/ports/RepositoryReceipt";

export default class RegisterReceipt
	implements IUseCase<RegisterReceiptDTO, Receipt>
{
	constructor(private repository: RepositoryReceipt) {}
	async execute(input: RegisterReceiptDTO): Promise<Receipt> {
		return await this.repository.register(input);
	}
}
