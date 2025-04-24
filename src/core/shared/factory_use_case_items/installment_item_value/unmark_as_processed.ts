import { InstallmentItemValue } from "@core/entities/installment_item_value.entity";
import IUseCase from "@core/shared/IUseCase";
import { IRepoBaseItemValue, IRepoInstallmentItemValue } from "@core/shared/RepositoryTypes";
import { Variants_Of_ItemValue } from "../../types/variants_items";

interface UnmarkInstallmentItemValueAsProcessed_Input {
    id: number
}

export default function Create_UseCase_InstallmentItemValue_UnmarkAsProcessed(variant: keyof typeof Variants_Of_ItemValue){
    return class UseCase_InstallmentItemValue_UnmarkAsProcessed implements IUseCase<UnmarkInstallmentItemValueAsProcessed_Input, InstallmentItemValue>{
        constructor(
            private repo_biv: IRepoBaseItemValue,
            private repo_iv: IRepoInstallmentItemValue
        ){}
        async execute(input: UnmarkInstallmentItemValueAsProcessed_Input): Promise<InstallmentItemValue> {
            const recurring_receipt = await this.repo_iv.findById(input.id)
            if(recurring_receipt){
                await this.repo_biv.update({
                    id: recurring_receipt.base_item_value.id,
                    was_processed: false
                })
                recurring_receipt.base_item_value.was_processed = false
                return recurring_receipt
            } else {
                throw new Error(`Installment ${variant} not found!`);
            }
        }
    }
}