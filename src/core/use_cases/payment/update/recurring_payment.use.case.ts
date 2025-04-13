import { RecurrenceType } from "@core/entities/recurrence_type.entity";
import { RecurringItemValue } from "@core/entities/recurring_item_value.entity";
import { Tag } from "@core/entities/tag.entity";
import { TransferMethodType } from "@core/entities/transfer_method_type.entity";
import IUseCase from "@core/shared/IUseCase";
import { Partial_DTO_BaseItemValue } from "@core/shared/PartialEntitiesTypes";
import { IRepoBaseItemValue, IRepoRecurrenceType, IRepoRecurringItemValue, IRepoTag, IRepoTransferMethodType } from "@core/shared/RepositoryTypes";

interface UpdateBaseItemValue extends StrictOmit<Partial_DTO_BaseItemValue, "tag"|"transfer_method_type"> {
    tag?: string;
    transfer_method_type?: string
}

interface UpdateRecurringPayment_Input {
    id: number;
    patch: {
        recurrence_type?: string;
        base_item_value?: UpdateBaseItemValue
    }
}

export default class UpdateRecurringPayment implements IUseCase<UpdateRecurringPayment_Input, RecurringItemValue | undefined>{
    constructor(
        private repo_riv: IRepoRecurringItemValue,
        private repo_biv: IRepoBaseItemValue,
        private repo_tag: IRepoTag,
        private repo_tmt: IRepoTransferMethodType,
        private repo_rt: IRepoRecurrenceType
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
    private async validate_recurrence_type(recurrence_type: string): Promise<RecurrenceType>{
        const recurrence_type_searched = await this.repo_rt.findByType(recurrence_type)
        if(!recurrence_type_searched) {throw new Error("Invalid transfer method type provided!")}
        return recurrence_type_searched;
    }

    async execute(input: UpdateRecurringPayment_Input): Promise<RecurringItemValue | undefined> {
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
        const inputted_recurrence_type = input.patch.recurrence_type
        if(inputted_recurrence_type){
            const recurrence_type = await this.validate_recurrence_type(inputted_recurrence_type)
            const recurrence_type_updated = await this.repo_riv.update({
                id: input.id,
                recurrence_type
            })

            if(!recurrence_type_updated) {throw new Error("Error updating recurring item value!")}
        }
        return this.repo_riv.findById(input.id)
    }
}