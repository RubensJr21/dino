import { IBankAccountTransferMethod } from "@src/core/entities/bank_account_transfer_method.entity";
import { MBankAccount } from "./bank_account.model";

export interface MBankAccountTransferMethod extends StrictOmit<IBankAccountTransferMethod, "bank_account"> {
  bank_account_id: MBankAccount["id"]
}