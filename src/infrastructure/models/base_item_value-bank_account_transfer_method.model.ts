import { BankAccountTransferMethod } from "@src/core/entities/bank_account_transfer_method.entity";
import { MBaseItemValue } from "./base_item_value.model";

export interface MBaseItemValue_BankAccountTransferMethod<T extends MBaseItemValue> {
  readonly id: number;
  base_item_value_id: T["biv_id"];
  bank_account_transfer_method_id: BankAccountTransferMethod["id"];
}