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
import { DTO_BankAccount, DTO_BankAccountTransferMethod, DTO_BaseItemValue, DTO_BaseItemValue_BankAccountTransferMethod, DTO_BaseItemValue_CreditCard, DTO_CreditCard, DTO_InstallmentItemValue, DTO_ItemValue, DTO_RecurrenceType, DTO_RecurringItemValue, DTO_Tag, DTO_TransferMethodType } from "./DTOTypes";
import IRepository from "./IRepository";
import { Partial_DTO_BankAccount, Partial_DTO_BankAccountTransferMethod, Partial_DTO_BaseItemValue, Partial_DTO_BaseItemValue_BankAccountTransferMethod, Partial_DTO_BaseItemValue_CreditCard, Partial_DTO_CreditCard, Partial_DTO_InstallmentItemValue, Partial_DTO_ItemValue, Partial_DTO_RecurrenceType, Partial_DTO_RecurringItemValue, Partial_DTO_Tag, Partial_DTO_TransferMethodType } from "./PartialEntitiesTypes";

// no-order-next-line
export interface IRepoTag extends IRepository<Tag, Partial_DTO_Tag, DTO_Tag, number> {
    findByDescription(description: string): Promise<Tag | undefined>;
}
// no-order-next-line
export interface IRepoTransferMethodType extends IRepository<TransferMethodType, Partial_DTO_TransferMethodType, DTO_TransferMethodType, number> {
    findByName(name: string): Promise<TransferMethodType | undefined>;
}
// no-order-next-line
export type IRepoBaseItemValue = IRepository<BaseItemValue, Partial_DTO_BaseItemValue, DTO_BaseItemValue, number>
// no-order-next-line
export type IRepoItemValue = IRepository<ItemValue, Partial_DTO_ItemValue, DTO_ItemValue, number>
// no-order-next-line
export interface IRepoRecurrenceType extends IRepository<RecurrenceType, Partial_DTO_RecurrenceType, DTO_RecurrenceType, number> {
    findByType(type: string): Promise<RecurrenceType | undefined>;
}
// no-order-next-line
export type IRepoRecurringItemValue = IRepository<RecurringItemValue, Partial_DTO_RecurringItemValue,DTO_RecurringItemValue, number>
// no-order-next-line
export type IRepoInstallmentItemValue = IRepository<InstallmentItemValue, Partial_DTO_InstallmentItemValue, DTO_InstallmentItemValue, number>
// no-order-next-line
export interface IRepoBankAccountTransferMethod extends IRepository<BankAccountTransferMethod, Partial_DTO_BankAccountTransferMethod, DTO_BankAccountTransferMethod, number> {
    findByBankAccountAndType(bank_account: BankAccount, type: string): Promise<BankAccountTransferMethod| undefined>
}
// no-order-next-line
export interface IRepoBankAccount extends IRepository<BankAccount, Partial_DTO_BankAccount, DTO_BankAccount, number> {
    findByNickname(nickname: string): Promise<BankAccount | undefined>
}
// no-order-next-line
export interface IRepoBaseItemValue_BankAccountTransferMethod extends IRepository<BaseItemValue_BankAccountTransferMethod, Partial_DTO_BaseItemValue_BankAccountTransferMethod, DTO_BaseItemValue_BankAccountTransferMethod, number>{
    findByBaseItemValueAndBankTransferMethod(base_item: BaseItemValue, ba_transfer_method: BankAccountTransferMethod): Promise<BaseItemValue_BankAccountTransferMethod | undefined>
}
// no-order-next-line
export interface IRepoCreditCard extends IRepository<CreditCard, Partial_DTO_CreditCard, DTO_CreditCard, number> {
    findByNickname(nickname: string): Promise<CreditCard | undefined>
}
export interface IRepoBaseItemValue_CreditCard extends IRepository<BaseItemValue_CreditCard, Partial_DTO_BaseItemValue_CreditCard, DTO_BaseItemValue_CreditCard, number> {
    findByBaseItemValueAndBankTransferMethod(base_item: BaseItemValue, credit_card: CreditCard): Promise<BaseItemValue_CreditCard | undefined>
}