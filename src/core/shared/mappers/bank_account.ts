import { BankAccount, IBankAccount } from "@src/core/entities/bank_account.entity";

export interface MapperInput extends StrictOmit<IBankAccount, "is_disabled">{
  is_disabled: number
}

export function bank_account_mapper(input: MapperInput): BankAccount {
  return new BankAccount({
    ...input,
    is_disabled: input.is_disabled === 1
  })
}