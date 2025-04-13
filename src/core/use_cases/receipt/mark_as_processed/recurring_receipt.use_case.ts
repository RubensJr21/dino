import { RecurringItemValue } from "@core/entities/recurring_item_value.entity";
import IUseCase from "@core/shared/IUseCase";
import { IRepoBaseItemValue, IRepoRecurringItemValue } from "@core/shared/RepositoryTypes";

interface MarkRecurringReceiptAsProcessed_Input {
    id: number
}

export default class MarkRecurringReceiptAsProcessed implements IUseCase<MarkRecurringReceiptAsProcessed_Input, RecurringItemValue>{
    constructor(
        private repo_biv: IRepoBaseItemValue,
        private repo_iv: IRepoRecurringItemValue
    ){}
    async execute(input: MarkRecurringReceiptAsProcessed_Input): Promise<RecurringItemValue> {
        const recurring_receipt = await this.repo_iv.findById(input.id)
        if(recurring_receipt){
            await this.repo_biv.update({
                id: recurring_receipt.base_item_value.id,
                was_processed: true
            })
            recurring_receipt.base_item_value.was_processed = true
            return recurring_receipt
        } else {
            throw new Error("Recurring Receipt not found!");
        }
    }
}