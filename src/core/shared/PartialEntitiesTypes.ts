import { BaseItemValue } from "../entities/base_item_value.entity";
import { Tag } from "../entities/tag.entity";
import { TransferMethodType } from "../entities/transfer_method_type.entity";
import { DTO_BankAccount, DTO_BankAccountTransferMethod, DTO_BaseItemValue_BankAccountTransferMethod, DTO_BaseItemValue_CreditCard, DTO_CreditCard, DTO_ItemValue, DTO_RecurrenceType, DTO_RecurringItemValue } from "./DTOTypes";

// no-order-next-line
export interface DTO_Tag_Update {
    description?: Tag["tag"]["description"]
}
// no-order-next-line
export interface DTO_TransferMethodType_Update{
    name?: TransferMethodType["tmt"]["name"]
}
// no-order-next-line
export interface DTO_BaseItemValue_Update {
    readonly id: number;
    description?: string;
    type?: string;
    scheduled_at?: Date;
    amount?: number;
    was_processed?: boolean;
    transfer_method_type?: TransferMethodType;
    tag?: Tag;
}
// no-order-next-line
export interface Partial_DTO_ItemValue extends Partial<StrictOmit<DTO_ItemValue, "base_item_value">>{
    readonly id: number;
    base_item_value?: BaseItemValue;
}
// no-order-next-line
export interface Partial_DTO_RecurrenceType extends Partial<DTO_RecurrenceType>{
    readonly id: number;
}
// no-order-next-line
export interface Partial_DTO_RecurringItemValue extends Partial<StrictOmit<DTO_RecurringItemValue, "base_item_value"|"recurrence_type">> {
    readonly id: number;
    base_item_value?: BaseItemValue;
    recurrence_type?: Partial_DTO_RecurrenceType;
}
// no-order-next-line
export interface DTO_InstallmentItemValue_Update{
    installments_number: number;
    base_item_value?: BaseItemValue;
}
// no-order-next-line
export interface Partial_DTO_BankAccountTransferMethod extends Partial<DTO_BankAccountTransferMethod> {
    readonly id: number;
}
// no-order-next-line
export interface Partial_DTO_BankAccount extends Partial<DTO_BankAccount>{
    readonly id: number;
}
// no-order-next-line
export interface Partial_DTO_BaseItemValue_BankAccountTransferMethod extends Partial<DTO_BaseItemValue_BankAccountTransferMethod>{
    readonly id: number;
}
// no-order-next-line
export interface Partial_DTO_CreditCard extends Partial<DTO_CreditCard>{
    readonly id: number;
}
// no-order-next-line
export interface Partial_DTO_BaseItemValue_CreditCard extends Partial<DTO_BaseItemValue_CreditCard>{
    readonly id: number;
}