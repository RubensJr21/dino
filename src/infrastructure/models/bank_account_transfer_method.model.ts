import { BankAccountTransferMethod } from "@src/core/entities/bank_account_transfer_method.entity";

export interface MBankAccountTransferMethod extends StrictOmit<BankAccountTransferMethod, "bank_account"> {
  bank_account_id: BankAccountTransferMethod["bank_account"]["id"]
}