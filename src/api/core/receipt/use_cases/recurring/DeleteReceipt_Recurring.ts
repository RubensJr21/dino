import IUseCase from "@core/_shared/IUseCase";
import Receipt_Recurring from "@core/receipt/model/Receipt_Recurring";
import RepositoryReceipt_Recurring from "@core/receipt/ports/IRepositoryReceipt_Recurring";

export default class DeleteReceipt_Recurring
	implements IUseCase<Receipt_Recurring["id"], boolean>
{
	constructor(private repository: RepositoryReceipt_Recurring) {}
	async execute(input: Receipt_Recurring["id"]): Promise<boolean> {
		// REVIEW: Aqui a gente não deleta de fato, a gente precisa marcar como disable
		//         Então na verdade eu vou atualizar e vou falar que is_disabled = true
		//         e disabled_at = CURRENT_DATE no caso do SQLite
		//         OBS: Preciso adicionar TRIGGERs nesses casos onde valores mudam e o
		//         banco precisa atualizar os valores automaticamente
		// TODO: Implementar Trigger de atualização de disabled_at = CURRENT_DATE
		return await this.repository.delete(input);
	}
}
