import { BaseItemValue } from "@core/entities/base_item_value.entity";
import { InstallmentItemValue } from "@core/entities/installment_item_value.entity";
import { Tag } from "@core/entities/tag.entity";
import { TransferMethodType } from "@core/entities/transfer_method_type.entity";
import { DTO_InstallmentItemValue } from "@core/shared/DTOTypes";
import IUseCase from "@core/shared/IUseCase";
import { IRepoBaseItemValue, IRepoInstallmentItemValue, IRepoTag, IRepoTransferMethodType } from "@core/shared/RepositoryTypes";

interface BaseItemValue_RegisterInput extends StrictOmit<BaseItemValue, "tag"|"transfer_method_type"|"type"> {
    tag: string;
    transfer_method_type: string;
}

interface RegisterInstallmentReceiptInput extends StrictOmit<DTO_InstallmentItemValue, "base_item_value"|"installments_number"> {
    base_item_value: BaseItemValue_RegisterInput;
    installments_number: number;
}

export default class RegisterInstallmentReceipt implements IUseCase<RegisterInstallmentReceiptInput, InstallmentItemValue> {
    constructor(
        private repo_biv: IRepoBaseItemValue,
        private repo_tag: IRepoTag,
        private repo_tmt: IRepoTransferMethodType,
        private repo_iiv: IRepoInstallmentItemValue
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

    async execute(input: RegisterInstallmentReceiptInput): Promise<InstallmentItemValue> {
        const tag = await this.validate_tag(input.base_item_value.tag)
        const transfer_method_type = await this.validate_transfer_method_type(input.base_item_value.transfer_method_type)

        this.validate_installments_number(input.installments_number)
        
        const base_item_value = await this.repo_biv.create({
            ...input.base_item_value,
            type: "Entrada",
            tag,
            transfer_method_type
        })

        if(!base_item_value) throw new Error("Error creating base item value!")
        
        const installment_item_value = await this.repo_iiv.create({
            installments_number: input.installments_number,
            base_item_value
        })
        if (!installment_item_value) {
            throw new Error("Error creating Installment Receipt!")
        }
        return installment_item_value;
    }

}