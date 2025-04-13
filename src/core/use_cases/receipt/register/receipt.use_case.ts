import { BaseItemValue } from "@core/entities/base_item_value.entity";
import { ItemValue } from "@core/entities/item_value.entity";
import { Tag } from "@core/entities/tag.entity";
import { TransferMethodType } from "@core/entities/transfer_method_type.entity";
import { DTO_ItemValue } from "@core/shared/DTOTypes";
import IUseCase from "@core/shared/IUseCase";
import { IRepoBaseItemValue, IRepoItemValue, IRepoTag, IRepoTransferMethodType } from "@core/shared/RepositoryTypes";

interface BaseItemValue_RegisterInput extends StrictOmit<BaseItemValue, "tag"|"transfer_method_type"|"type"> {
    tag: string;
    transfer_method_type: string;
}

interface RegisterReceiptInput extends StrictOmit<DTO_ItemValue, "base_item_value"> {
    base_item_value: BaseItemValue_RegisterInput
}

export default class RegisterReceipt implements IUseCase<RegisterReceiptInput, ItemValue> {
    constructor(
        private repo_biv: IRepoBaseItemValue,
        private repo_iv: IRepoItemValue,
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
    async execute(input: RegisterReceiptInput): Promise<ItemValue> {
        const tag = await this.validate_tag(input.base_item_value.tag)
        const transfer_method_type = await this.validate_transfer_method_type(input.base_item_value.transfer_method_type)
        
        const base_item_value = await this.repo_biv.create({
            ...input.base_item_value,
            type: "Entrada",
            tag,
            transfer_method_type
        })

        if(!base_item_value) throw new Error("Error creating base item value!")

        const item_value = await this.repo_iv.create({
            base_item_value
        })
        if (!item_value) {
            throw new Error("Error creating Receipt!")
        } else {
            return item_value;
        }
    }
}