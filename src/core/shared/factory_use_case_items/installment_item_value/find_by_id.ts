import { ItemValue } from "@core/entities/item_value.entity";
import IUseCase from "@core/shared/IUseCase";
import { IRepoInstallmentItemValue } from "@core/shared/RepositoryTypes";
import { Variants_Of_ItemValue } from "../../types/variants_items";

interface FindInstallmentItemValueById_Input {
    id: number
}

export default function Create_UseCase_InstallmentItemValue_FindById(variant: keyof typeof Variants_Of_ItemValue){
    return class UseCase_InstallmentItemValue_FindById implements IUseCase<FindInstallmentItemValueById_Input, ItemValue> {
        constructor(
            private repo_iiv: IRepoInstallmentItemValue
        ){}
        async execute(input: FindInstallmentItemValueById_Input): Promise<ItemValue> {
            const iiv = await this.repo_iiv.findById(input.id)
            if(!iiv){
                throw new Error(`Installment ${variant} not found!`);
            }
            return iiv
        }
    }
}