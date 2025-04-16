import { InstallmentItemValue } from "@core/entities/installment_item_value.entity";
import IUseCase from "@core/shared/IUseCase";
import { IRepoInstallmentItemValue } from "@core/shared/RepositoryTypes";
import { Variants_Of_ItemValue } from "../types/variants_items";

export default function Create_UseCase_InstallmentItemValue_ListAll(variant: keyof typeof Variants_Of_ItemValue){
    return class Create_UseCase_InstallmentItemValue_ListAll implements IUseCase<void, InstallmentItemValue[]> {
        constructor(
            private repo_iiv: IRepoInstallmentItemValue
        ){}
        async execute(): Promise<InstallmentItemValue[]> {
            const item_values = await this.repo_iiv.findAll()
            return item_values.filter((iiv) => {
                return iiv.base_item_value.type === Variants_Of_ItemValue[variant]
            });
        }
    }
}