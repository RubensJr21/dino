import { InstallmentItemValue } from "@core/entities/installment_item_value.entity";
import { Tag } from "@core/entities/tag.entity";
import { TransferMethodType } from "@core/entities/transfer_method_type.entity";
import IUseCase from "@core/shared/IUseCase";
import { Partial_DTO_BaseItemValue } from "@core/shared/PartialEntitiesTypes";
import { IRepoBaseItemValue, IRepoInstallmentItemValue, IRepoTag, IRepoTransferMethodType } from "@core/shared/RepositoryTypes";

interface UpdateBaseItemValue extends StrictOmit<Partial_DTO_BaseItemValue, "tag"|"transfer_method_type">{
    tag?: string;
    transfer_method_type?: string
}

interface UpdateInstallmentPayment_Input {
    id: number;
    patch: {
        installments_number?: number;
        base_item_value?: UpdateBaseItemValue
    }
}

export default class UpdateInstallmentPayment implements IUseCase<UpdateInstallmentPayment_Input, InstallmentItemValue | undefined>{
    constructor(
        private repo_iiv: IRepoInstallmentItemValue,
        private repo_biv: IRepoBaseItemValue,
        private repo_tag: IRepoTag,
        private repo_tmt: IRepoTransferMethodType
    ){}

    private async validate_tag(description: Tag["description"]): Promise<Tag>{
        const tag_searched = await this.repo_tag.findByDescription(description)
        if(!tag_searched) {throw new Error("Invalid tag provided!")}
        return tag_searched;
    }
    private async validate_transfer_method_type(name: TransferMethodType["name"]): Promise<TransferMethodType>{
        const transfer_method_type_searched = await this.repo_tmt.findByName(name)
        if(!transfer_method_type_searched) {throw new Error("Invalid transfer method type provided!")}
        return transfer_method_type_searched;
    }
    private validate_installments_number(installments_number: InstallmentItemValue["installments_number"]): void{
        if(installments_number <= 1){
            throw new Error("Valor informado para o número de parcelas é inválido")
        }
    }

    async execute(input: UpdateInstallmentPayment_Input): Promise<InstallmentItemValue | undefined> {
        if(input.patch.base_item_value){
            let base_item_value: Partial_DTO_BaseItemValue = {
                id: input.patch.base_item_value.id
            }
            const inputted_tag = input.patch.base_item_value?.tag
            if(inputted_tag){
                const tag = await this.validate_tag(inputted_tag)
                base_item_value = {
                    ...base_item_value,
                    tag
                }
            }
            const inputted_transfer_method_type = input.patch.base_item_value?.transfer_method_type
            if(inputted_transfer_method_type){
                const transfer_method_type = await this.validate_transfer_method_type(inputted_transfer_method_type)
                base_item_value = {
                    ...base_item_value,
                    transfer_method_type
                }
            }

            const base_item_value_updated = await this.repo_biv.update({
                ...base_item_value
            })

            if(!base_item_value_updated) {throw new Error("Error updating base item value!")}
        }
        const inputted_installments_number = input.patch.installments_number
        if(inputted_installments_number){
            this.validate_installments_number(inputted_installments_number)
            const installment_item_value_updated = await this.repo_iiv.update({
                id: input.id,
                installments_number: inputted_installments_number
            })

            if(!installment_item_value_updated) {throw new Error("Error updating installment item value!")}
        }
        return this.repo_iiv.findById(input.id)
    }
}