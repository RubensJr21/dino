import { MBankAccountTransferMethod } from "./bank_account_transfer_method.model";
import { MItemValue } from "./item_value.model";

export interface MItemValue_BankAccountTransferMethod<T extends MItemValue> {
  readonly id: number;
  fk_id_item_value: T["id"];
  fk_id_bank_account_transfer_method: MBankAccountTransferMethod["id"];
}