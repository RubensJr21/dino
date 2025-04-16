import IUseCase from "@core/shared/IUseCase";
import { IRepoBaseItemValue, IRepoRecurringItemValue } from "@core/shared/RepositoryTypes";
import { Variants_Of_ItemValue } from "../types/variants_items";

interface DeleteRecurringItemValue_Input {
    id: number
}

export default function Create_UseCase_RecurringItemValue_Delete(variant: keyof typeof Variants_Of_ItemValue){
    return class UseCase_RecurringItemValue_Delete implements IUseCase<DeleteRecurringItemValue_Input, boolean>{
        constructor(
            private repo_biv: IRepoBaseItemValue,
            private repo_riv: IRepoRecurringItemValue
        ){}
        async execute(input: DeleteRecurringItemValue_Input): Promise<boolean> {
            const recurring_receipt = await this.repo_riv.findById(input.id)
            if(recurring_receipt){
                // Removendo o base_item_value a remoção é propagada
                await this.repo_biv.delete(recurring_receipt.base_item_value.id)
            } else {
                throw new Error(`Recurring ${variant} not found!`);
            }
            return true;
        }
    }
}