import { BaseItemValue } from "@core/entities/base_item_value.entity";
import { RecurrenceType } from "@core/entities/recurrence_type.entity";
import { RecurringItemValue } from "@core/entities/recurring_item_value.entity";
import { Tag } from "@core/entities/tag.entity";
import { TransferMethodType } from "@core/entities/transfer_method_type.entity";
import { DTO_RecurringItemValue } from "@core/shared/DTOTypes";
import IUseCase from "@core/shared/IUseCase";
import { IRepoBaseItemValue, IRepoRecurrenceType, IRepoRecurringItemValue, IRepoTag, IRepoTransferMethodType } from "@core/shared/RepositoryTypes";
import { Variants_Of_ItemValue } from "../types/variants_items";

interface BaseItemValue_RegisterInput extends StrictOmit<BaseItemValue, "tag"|"transfer_method_type"|"type"> {
    tag: string;
    transfer_method_type: string;
}

interface RegisterRecurringInput extends StrictOmit<DTO_RecurringItemValue, "base_item_value"|"recurrence_type"> {
    base_item_value: BaseItemValue_RegisterInput;
    recurrence_type: string;
}

export default function Create_UseCase_RecurringItemValue_Register(variant: keyof typeof Variants_Of_ItemValue){
    return class UseCase_RecurringItemValue_Register implements IUseCase<RegisterRecurringInput, RecurringItemValue> {
        constructor(
            private repo_biv: IRepoBaseItemValue,
            private repo_riv: IRepoRecurringItemValue,
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
        private async validate_recurrence_type(type: RecurrenceType["type"]): Promise<RecurrenceType> {
            const recurrence_type_searched = await this.repo_rt.findByType(type)
            if(!recurrence_type_searched) {throw new Error("Invalid recurrence type provided!")}
            return recurrence_type_searched;
        }
        async execute(input: RegisterRecurringInput): Promise<RecurringItemValue> {
            const tag = await this.validate_tag(input.base_item_value.tag)
            const transfer_method_type = await this.validate_transfer_method_type(input.base_item_value.transfer_method_type)
            const recurrence_type = await this.validate_recurrence_type(input.recurrence_type)
    
    
            const base_item_value = await this.repo_biv.create({
                ...input.base_item_value,
                type: Variants_Of_ItemValue[variant],
                tag,
                transfer_method_type
            })
    
            if(!base_item_value) throw new Error("Error creating base item value!")
            
            const recurring_item_value = await this.repo_riv.create({
                base_item_value,
                recurrence_type,
                is_disabled: false
            })
            if (!recurring_item_value) {
                throw new Error("Error creating Recurring !")
            } else {
                return recurring_item_value;
            }
        }
    }
}