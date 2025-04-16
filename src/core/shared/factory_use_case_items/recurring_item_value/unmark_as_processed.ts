import { RecurringItemValue } from "@core/entities/recurring_item_value.entity";
import IUseCase from "@core/shared/IUseCase";
import { IRepoBaseItemValue, IRepoRecurringItemValue } from "@core/shared/RepositoryTypes";
import { Variants_Of_ItemValue } from "../types/variants_items";

interface UnmarkRecurringItemValueAsProcessed_Input {
    id: number
}

export default function Create_UseCase_RecurringItemValue_UnmarkAsProcessed(variant: keyof typeof Variants_Of_ItemValue){
    return class Create_UseCase_RecurringItemValue_UnmarkAsProcessed implements IUseCase<UnmarkRecurringItemValueAsProcessed_Input, RecurringItemValue>{
        constructor(
            private repo_biv: IRepoBaseItemValue,
            private repo_iv: IRepoRecurringItemValue
        ){}
        async execute(input: UnmarkRecurringItemValueAsProcessed_Input): Promise<RecurringItemValue> {
            const recurring_receipt = await this.repo_iv.findById(input.id)
            if(recurring_receipt){
                await this.repo_biv.update({
                    id: recurring_receipt.base_item_value.id,
                    was_processed: false
                })
                recurring_receipt.base_item_value.was_processed = false
                return recurring_receipt
            } else {
                throw new Error(`Recurring ${variant} not found!`);
            }
        }
    }
}