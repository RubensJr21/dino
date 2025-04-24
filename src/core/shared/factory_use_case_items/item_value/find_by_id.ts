import { ItemValue } from "@core/entities/item_value.entity";
import IUseCase from "@core/shared/IUseCase";
import { IRepoItemValue } from "@core/shared/RepositoryTypes";
import { Variants_Of_ItemValue } from "../../types/variants_items";

interface FindItemValueById_Input {
    id: number
}

export default function Create_UseCase_ItemValue_FindById(variant: keyof typeof Variants_Of_ItemValue){
    return class UseCase_ItemValue_FindById implements IUseCase<FindItemValueById_Input, ItemValue> {
        constructor(
            private repo_iv: IRepoItemValue,
        ){}
        async execute(input: FindItemValueById_Input): Promise<ItemValue> {
            const payment = await this.repo_iv.findById(input.id)
            if(!payment){
                throw new Error(`${variant} not found!`);
            }
            return payment
        }
    }
}