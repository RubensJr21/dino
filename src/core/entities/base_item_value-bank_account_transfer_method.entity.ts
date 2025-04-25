import { IBankAccountTransferMethod } from "./bank_account_transfer_method.entity";
import { ABaseItemValue } from "./base_item_value.entity";

export interface IBaseItemValue_BankAccountTransferMethod<T extends ABaseItemValue> {
  readonly id: number;
  base_item_value: T;
  bank_account_transfer_method: IBankAccountTransferMethod;
}