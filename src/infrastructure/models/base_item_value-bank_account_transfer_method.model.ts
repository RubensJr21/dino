import { MBankAccountTransferMethod } from "./bank_account_transfer_method.model";
import { MBaseItemValue } from "./base_item_value.model";

export interface MBaseItemValue_BankAccountTransferMethod<T extends MBaseItemValue> {
  readonly id: number;
  fk_id_base_item_value: T["fk_id_base_item_value"];
  fk_id_bank_account_transfer_method: MBankAccountTransferMethod["id"];
}