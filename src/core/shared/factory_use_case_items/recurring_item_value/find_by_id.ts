import { ItemValue } from "@core/entities/item_value.entity";
import IUseCase from "@core/shared/IUseCase";
import { IRepoRecurringItemValue } from "@core/shared/RepositoryTypes";
import { Variants_Of_ItemValue } from "../types/variants_items";

interface FindRecurringReceiptById_Input {
    id: number
}

export default function Create_UseCase_RecurringItemValue_FindById(variant: keyof typeof Variants_Of_ItemValue){
    return class FindRecurringReceiptById implements IUseCase<FindRecurringReceiptById_Input, ItemValue> {
        constructor(
            private repo_riv: IRepoRecurringItemValue
        ){}
        async execute(input: FindRecurringReceiptById_Input): Promise<ItemValue> {
            const payment = await this.repo_riv.findById(input.id)
            if(!payment){
                throw new Error(`Recurring ${variant} not found!`);
            }
            return payment
        }
    }
}