import { BankAccount, IBankAccount } from "@src/core/entities/bank_account.entity";

export function bank_account_mapper(input: IBankAccount): BankAccount {
  return new BankAccount(input)
}