import { ItemValue } from "@core/entities/item_value.entity";
import IUseCase from "@core/shared/IUseCase";
import { IRepoRecurringItemValue } from "@core/shared/RepositoryTypes";

interface FindRecurringPaymentById_Input {
    id: number
}

export default class FindRecurringPaymentById implements IUseCase<FindRecurringPaymentById_Input, ItemValue> {
    constructor(
        private repo_riv: IRepoRecurringItemValue
    ){}
    async execute(input: FindRecurringPaymentById_Input): Promise<ItemValue> {
        const payment = await this.repo_riv.findById(input.id)
        if(!payment){
            throw new Error("Recurring Payment not found!");
        }
        return payment
    }
}