import { IBankAccountTransferMethod } from "@src/core/entities/bank_account_transfer_method.entity";
import { MBankAccount } from "./bank_account.model";
import { MTransferMethod } from "./transfer_method.model";

export interface MBankAccountTransferMethod extends StrictOmit<IBankAccountTransferMethod, "bank_account"|"transfer_method"> {
  fk_id_bank_account: MBankAccount["id"]
  fk_id_transfer_method: MTransferMethod["id"]
}