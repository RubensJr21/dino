import { ItemValue } from "@core/entities/item_value.entity";
import IUseCase from "@core/shared/IUseCase";
import { IRepoItemValue } from "@core/shared/RepositoryTypes";

interface FindPaymentById_Input {
    id: number
}

export default class FindPaymentById implements IUseCase<FindPaymentById_Input, ItemValue> {
    constructor(
        private repo_iv: IRepoItemValue,
    ){}
    async execute(input: FindPaymentById_Input): Promise<ItemValue> {
        const payment = await this.repo_iv.findById(input.id)
        if(!payment){
            throw new Error("Payment not found!");
        }
        return payment
    }
}