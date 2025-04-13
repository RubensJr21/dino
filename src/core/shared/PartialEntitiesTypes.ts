import { DTO_BankAccount, DTO_BankAccountTransferMethod, DTO_BaseItemValue, DTO_BaseItemValue_BankAccountTransferMethod, DTO_BaseItemValue_CreditCard, DTO_CreditCard, DTO_InstallmentItemValue, DTO_ItemValue, DTO_RecurrenceType, DTO_RecurringItemValue, DTO_Tag, DTO_TransferMethodType } from "./DTOTypes";

// no-order-next-line
export interface Partial_DTO_Tag extends Partial<DTO_Tag>{
    readonly id: number;
}
// no-order-next-line
export interface Partial_DTO_TransferMethodType extends Partial<DTO_TransferMethodType>{
    readonly id: number;
}
// no-order-next-line
export interface Partial_DTO_BaseItemValue extends Partial<StrictOmit<DTO_BaseItemValue, "tag"|"transfer_method_type">> {
    readonly id: number;
    tag?: Partial_DTO_Tag;
    transfer_method_type?: Partial_DTO_TransferMethodType;
}
// no-order-next-line
export interface Partial_DTO_ItemValue extends Partial<StrictOmit<DTO_ItemValue, "base_item_value">>{
    readonly id: number;
    base_item_value?: Partial_DTO_BaseItemValue;
}
// no-order-next-line
export interface Partial_DTO_RecurrenceType extends Partial<DTO_RecurrenceType>{
    readonly id: number;
}
// no-order-next-line
export interface Partial_DTO_RecurringItemValue extends Partial<StrictOmit<DTO_RecurringItemValue, "base_item_value"|"recurrence_type">> {
    readonly id: number;
    base_item_value?: Partial_DTO_BaseItemValue;
    recurrence_type?: Partial_DTO_RecurrenceType;
}
// no-order-next-line
export interface Partial_DTO_InstallmentItemValue extends Partial<DTO_InstallmentItemValue>{
    readonly id: number;
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