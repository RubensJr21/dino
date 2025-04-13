import { ItemValue } from "@core/entities/item_value.entity";
import IUseCase from "@core/shared/IUseCase";
import { IRepoBaseItemValue, IRepoItemValue } from "@core/shared/RepositoryTypes";

interface UnmarkPaymentAsProcessed_Input {
    id: number
}

export default class UnmarkPaymentAsProcessed implements IUseCase<UnmarkPaymentAsProcessed_Input, ItemValue>{
    constructor(
        private repo_biv: IRepoBaseItemValue,
        private repo_iv: IRepoItemValue
    ){}
    async execute(input: UnmarkPaymentAsProcessed_Input): Promise<ItemValue> {
        const receipt = await this.repo_iv.findById(input.id)
        if(receipt){
            await this.repo_biv.update({
                id: receipt.base_item_value.id,
                was_processed: false
            })
            receipt.base_item_value.was_processed = false
            return receipt
        } else {
            throw new Error("Payment not found!");
        }
    }
}