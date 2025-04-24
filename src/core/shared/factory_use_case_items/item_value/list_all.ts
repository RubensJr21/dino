import { ItemValue } from "@core/entities/item_value.entity";
import IUseCase from "@core/shared/IUseCase";
import { IRepoItemValue } from "@core/shared/RepositoryTypes";
import { Variants_Of_ItemValue } from "../../types/variants_items";

export default function Create_UseCase_ItemValue_ListAll(variant: keyof typeof Variants_Of_ItemValue){
    return class ListAllReceipts implements IUseCase<void, ItemValue[]> {
        constructor(
            private repo_iv: IRepoItemValue,
        ){}
        async execute(): Promise<ItemValue[]> {
            const item_values = await this.repo_iv.findAll()
            return item_values.filter((iv) => {
                return iv.base_item_value.type === Variants_Of_ItemValue[variant]
            });
        }
    }
}