import IUseCase from "@core/shared/IUseCase";
import { IRepoBaseItemValue, IRepoRecurringItemValue } from "@core/shared/RepositoryTypes";

interface DeleteRecurringReceipt_Input {
    id: number
}

export default class DeleteRecurringReceipt implements IUseCase<DeleteRecurringReceipt_Input, boolean>{
    constructor(
        private repo_biv: IRepoBaseItemValue,
        private repo_riv: IRepoRecurringItemValue
    ){}
    async execute(input: DeleteRecurringReceipt_Input): Promise<boolean> {
        const recurring_receipt = await this.repo_riv.findById(input.id)
        if(recurring_receipt){
            // Removendo o base_item_value a remoção é propagada
            await this.repo_biv.delete(recurring_receipt.base_item_value.id)
        } else {
            throw new Error("Recurring Receipt not found!");
        }
        return true;
    }
}