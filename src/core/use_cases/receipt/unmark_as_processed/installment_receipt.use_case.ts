import { InstallmentItemValue } from "@core/entities/installment_item_value.entity";
import IUseCase from "@core/shared/IUseCase";
import { IRepoBaseItemValue, IRepoInstallmentItemValue } from "@core/shared/RepositoryTypes";

interface UnmarkInstallmentReceiptAsProcessed_Input {
    id: number
}

export default class UnmarkInstallmentReceiptAsProcessed implements IUseCase<UnmarkInstallmentReceiptAsProcessed_Input, InstallmentItemValue>{
    constructor(
        private repo_biv: IRepoBaseItemValue,
        private repo_iv: IRepoInstallmentItemValue
    ){}
    async execute(input: UnmarkInstallmentReceiptAsProcessed_Input): Promise<InstallmentItemValue> {
        const recurring_receipt = await this.repo_iv.findById(input.id)
        if(recurring_receipt){
            await this.repo_biv.update({
                id: recurring_receipt.base_item_value.id,
                was_processed: false
            })
            recurring_receipt.base_item_value.was_processed = false
            return recurring_receipt
        } else {
            throw new Error("Installment Receipt not found!");
        }
    }
}