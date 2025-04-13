import { ItemValue } from "@core/entities/item_value.entity";
import IUseCase from "@core/shared/IUseCase";
import { IRepoItemValue } from "@core/shared/RepositoryTypes";

interface FindReceiptById_Input {
    id: number
}

export default class FindReceiptById implements IUseCase<FindReceiptById_Input, ItemValue> {
    constructor(
        private repo_iv: IRepoItemValue,
    ){}
    async execute(input: FindReceiptById_Input): Promise<ItemValue> {
        const payment = await this.repo_iv.findById(input.id)
        if(!payment){
            throw new Error("Receipt not found!");
        }
        return payment
    }
}