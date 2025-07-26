import { BankAccount, IBankAccount } from "@src/core/entities/bank_account.entity";
import { BankAccountTransferMethod, IBankAccountTransferMethod } from "@src/core/entities/bank_account_transfer_method.entity";
import { ITransferMethod, TransferMethod } from "@src/core/entities/transfer_method.entity";

interface MapperInput extends StrictOmit<IBankAccountTransferMethod, "bank_account" | "transfer_method"> {
  bank_account: IBankAccount;
  transfer_method: ITransferMethod
}

export function bank_account_transfer_method_mapper(input: MapperInput): BankAccountTransferMethod {
  const {
    bank_account,
    transfer_method,
    ...bank_account_transfer_method_searched
  } = input

  return new BankAccountTransferMethod({
    ...bank_account_transfer_method_searched,
    bank_account: new BankAccount(bank_account),
    transfer_method: new TransferMethod(transfer_method)
  })
}