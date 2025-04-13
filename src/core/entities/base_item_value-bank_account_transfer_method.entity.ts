import { BankAccountTransferMethod } from "./bank_account_transfer_method.entity";
import { BaseItemValue } from "./base_item_value.entity";

export interface BaseItemValue_BankAccountTransferMethod {
    readonly id: number;
    base_item_value: BaseItemValue;
    bank_account_transfer_method: BankAccountTransferMethod;
}