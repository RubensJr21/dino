import { ItemValue } from "@core/entities/item_value.entity";
import IUseCase from "@core/shared/IUseCase";
import { IRepoBaseItemValue, IRepoItemValue } from "@core/shared/RepositoryTypes";

interface MarkReceiptAsProcessed_Input {
    id: number
}

export default class MarkReceiptAsProcessed implements IUseCase<MarkReceiptAsProcessed_Input, ItemValue>{
    constructor(
        private repo_biv: IRepoBaseItemValue,
        private repo_iv: IRepoItemValue
    ){}
    async execute(input: MarkReceiptAsProcessed_Input): Promise<ItemValue> {
        const receipt = await this.repo_iv.findById(input.id)
        if(receipt){
            await this.repo_biv.update({
                id: receipt.base_item_value.id,
                was_processed: true
            })
            receipt.base_item_value.was_processed = true
            return receipt
        } else {
            throw new Error("Receipt not found!");
        }
    }
}