import { ItemValue } from "@core/entities/item_value.entity";
import { Tag } from "@core/entities/tag.entity";
import { TransferMethodType } from "@core/entities/transfer_method_type.entity";
import IUseCase from "@core/shared/IUseCase";
import { Partial_DTO_BaseItemValue } from "@core/shared/PartialEntitiesTypes";
import { IRepoBaseItemValue, IRepoItemValue, IRepoTag, IRepoTransferMethodType } from "@core/shared/RepositoryTypes";

interface UpdateBaseItemValue extends StrictOmit<Partial_DTO_BaseItemValue, "tag"|"transfer_method_type"> {
    tag?: string;
    transfer_method_type?: string
}

interface UpdatePayment_Input {
    readonly id: number;
    patch: {
        base_item_value?: UpdateBaseItemValue
    }
}

export default class UpdatePayment implements IUseCase<UpdatePayment_Input, ItemValue | undefined>{
    constructor(
        private repo_iv: IRepoItemValue,
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
    async execute(input: UpdatePayment_Input): Promise<ItemValue | undefined> {
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
        return this.repo_iv.findById(input.id)
    }
}