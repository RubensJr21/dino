import { BankAccount } from "@core/entities/bank_account.entity";
import { BankAccountTransferMethod } from "@core/entities/bank_account_transfer_method.entity";
import { BaseItemValue_BankAccountTransferMethod } from "@core/entities/base_item_value-bank_account_transfer_method.entity";
import { BaseItemValue_CreditCard } from "@core/entities/base_item_value-credit_card.entity";
import { BaseItemValue } from "@core/entities/base_item_value.entity";
import { CreditCard } from "@core/entities/credit_card.entity";
import { InstallmentItemValue } from "@core/entities/installment_item_value.entity";
import { ItemValue } from "@core/entities/item_value.entity";
import { RecurrenceType } from "@core/entities/recurrence_type.entity";
import { RecurringItemValue } from "@core/entities/recurring_item_value.entity";
import { Tag } from "@core/entities/tag.entity";
import { TransferMethodType } from "@core/entities/transfer_method_type.entity";

// no-order-next-line
export type DTO_Tag = StrictOmit<Tag, "id">
// no-order-next-line
export type DTO_TransferMethodType = StrictOmit<TransferMethodType, "id">
// no-order-next-line
type Partial_BaseItemValue = StrictOmit<BaseItemValue, "id"|"created_at"|"updated_at">
export interface DTO_BaseItemValue extends Partial_BaseItemValue {}
// no-order-next-line
type Partial_ItemValue = StrictOmit<ItemValue, "id">
export interface DTO_ItemValue extends Partial_ItemValue {}
// no-order-next-line
export type DTO_RecurrenceType = StrictOmit<RecurrenceType, "id">
// no-order-next-line
type Partial_RecurringItemValue = StrictOmit<RecurringItemValue, "id">
export interface DTO_RecurringItemValue extends Partial_RecurringItemValue {}
// no-order-next-line
type Partial_InstallmentItemValue = StrictOmit<InstallmentItemValue, "id">
export interface DTO_InstallmentItemValue extends Partial_InstallmentItemValue {}
// no-order-next-line
export type DTO_BankAccountTransferMethod = StrictOmit<BankAccountTransferMethod, "id"|"created_at"|"updated_at">
// no-order-next-line
type Partial_BankAccount = StrictOmit<BankAccount, "id"|"created_at"|"updated_at">
export interface DTO_BankAccount extends Partial_BankAccount {}
// no-order-next-line
export type DTO_BaseItemValue_BankAccountTransferMethod = BaseItemValue_BankAccountTransferMethod
// no-order-next-line
export type DTO_CreditCard = StrictOmit<CreditCard, "id"|"created_at"|"updated_at">
// no-order-next-line
export type DTO_BaseItemValue_CreditCard = BaseItemValue_CreditCard
