import { ItemValue } from "@core/entities/item_value.entity";
import IUseCase from "@core/shared/IUseCase";
import { IRepoRecurringItemValue } from "@core/shared/RepositoryTypes";

interface FindRecurringReceiptById_Input {
    id: number
}

export default class FindRecurringReceiptById implements IUseCase<FindRecurringReceiptById_Input, ItemValue> {
    constructor(
        private repo_riv: IRepoRecurringItemValue
    ){}
    async execute(input: FindRecurringReceiptById_Input): Promise<ItemValue> {
        const payment = await this.repo_riv.findById(input.id)
        if(!payment){
            throw new Error("Recurring Receipt not found!");
        }
        return payment
    }
}