import { RecurringItemValue } from "@core/entities/recurring_item_value.entity";
import IUseCase from "@core/shared/IUseCase";
import { IRepoBaseItemValue, IRepoRecurringItemValue } from "@core/shared/RepositoryTypes";

interface UnmarkRecurringPaymentAsProcessed_Input {
    id: number
}

export default class UnmarkRecurringPaymentAsProcessed implements IUseCase<UnmarkRecurringPaymentAsProcessed_Input, RecurringItemValue>{
    constructor(
        private repo_biv: IRepoBaseItemValue,
        private repo_iv: IRepoRecurringItemValue
    ){}
    async execute(input: UnmarkRecurringPaymentAsProcessed_Input): Promise<RecurringItemValue> {
        const recurring_receipt = await this.repo_iv.findById(input.id)
        if(recurring_receipt){
            await this.repo_biv.update({
                id: recurring_receipt.base_item_value.id,
                was_processed: false
            })
            recurring_receipt.base_item_value.was_processed = false
            return recurring_receipt
        } else {
            throw new Error("Recurring Payment not found!");
        }
    }
}