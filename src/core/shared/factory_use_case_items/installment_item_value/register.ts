import { InstallmentItemValue } from "@core/entities/installment_item_value.entity";
import IUseCase from "@core/shared/IUseCase";
import { IRepoBaseItemValue, IRepoInstallmentItemValue } from "@core/shared/RepositoryTypes";
import { BaseItemValue } from "@src/core/entities/base_item_value.entity";
import { Variants_Of_ItemValue } from "../../types/variants_items";

interface RegisterInstallmentInput {
    // REVIEW: provavelmente ao invés de receber o objeto
    // aqui eu vou receber os atributos de um BaseItemValue
    base_item_value: BaseItemValue;
    installments_number: number;
}

export default function Create_UseCase_InstallmentItemValue_Register(variant: keyof typeof Variants_Of_ItemValue){
    return class UseCase_InstallmentItemValue_Register implements IUseCase<RegisterInstallmentInput, InstallmentItemValue> {
        constructor(
            private repo_biv: IRepoBaseItemValue,
            private repo_iiv: IRepoInstallmentItemValue
        ){}
    
        async execute(input: RegisterInstallmentInput): Promise<InstallmentItemValue> {
            // TODO: envolver com try/catch
            input.base_item_value.tag.validate()
            // TODO: envolver com try/catch
            input.base_item_value.transfer_method_type.validate();

            const iiv = new InstallmentItemValue({
                installments_number: input.installments_number,
                base_item_value: input.base_item_value
            })
            iiv.validate()
            
            const base_item_value = await this.repo_biv.create({
                ...input.base_item_value,
                type: Variants_Of_ItemValue[variant],
                tag: input.base_item_value.tag.properties,
                transfer_method_type: input.base_item_value.transfer_method_type.properties
            })
    
            if(!base_item_value) throw new Error("Error creating base item value!")
            
            const installment_item_value = await this.repo_iiv.create({
                installments_number: input.installments_number,
                base_item_value
            })
            if (!installment_item_value) {
                throw new Error("Error creating Installment !")
            }
            return installment_item_value;
        }
    
    }
}