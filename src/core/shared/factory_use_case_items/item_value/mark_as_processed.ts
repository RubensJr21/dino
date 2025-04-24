import { ItemValue } from "@core/entities/item_value.entity";
import IUseCase from "@core/shared/IUseCase";
import { IRepoBaseItemValue, IRepoItemValue } from "@core/shared/RepositoryTypes";
import { Variants_Of_ItemValue } from "../../types/variants_items";

interface MarkItemValueAsProcessed_Input {
    id: number
}

export default function Create_UseCase_ItemValue_MarkAsProcessed(variant: keyof typeof Variants_Of_ItemValue){
    return class UseCase_ItemValue_MarkAsProcessed implements IUseCase<MarkItemValueAsProcessed_Input, ItemValue>{
        constructor(
            private repo_biv: IRepoBaseItemValue,
            private repo_iv: IRepoItemValue
        ){}
        async execute(input: MarkItemValueAsProcessed_Input): Promise<ItemValue> {
            const receipt = await this.repo_iv.findById(input.id)
            if(receipt){
                await this.repo_biv.update({
                    id: receipt.base_item_value.id,
                    was_processed: true
                })
                receipt.base_item_value.was_processed = true
                return receipt
            } else {
                throw new Error(`${variant} not found!`);
            }
        }
    }
}