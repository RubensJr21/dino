import { IBankAccountTransferMethod } from "@src/core/entities/bank_account_transfer_method.entity";

export interface MBankAccountTransferMethod extends StrictOmit<IBankAccountTransferMethod, "bank_account"> {
  bank_account_id: IBankAccountTransferMethod["bank_account"]["id"]
}