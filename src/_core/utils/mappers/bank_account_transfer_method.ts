import { BankAccountTransferMethod, IBankAccountTransferMethod } from "@domain/entities/bank_account_transfer_method.entity";
import { ITransferMethod, TransferMethod } from "@domain/entities/transfer_method.entity";
import { bank_account_mapper, MapperInput as MapperBankAccount } from "./bank_account";

interface MapperInput extends StrictOmit<IBankAccountTransferMethod, "bank_account" | "transfer_method" | "is_disabled" > {
  bank_account: MapperBankAccount;
  transfer_method: ITransferMethod;
  is_disabled: number;
}

export function bank_account_transfer_method_mapper(input: MapperInput): BankAccountTransferMethod {
  const {
    bank_account,
    transfer_method,
    is_disabled,
    ...bank_account_transfer_method_searched
  } = input

  return new BankAccountTransferMethod({
    is_disabled: is_disabled === 0,
    ...bank_account_transfer_method_searched,
    bank_account: bank_account_mapper(bank_account),
    transfer_method: new TransferMethod(transfer_method)
  })
}