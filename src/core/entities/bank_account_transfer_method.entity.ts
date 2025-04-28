import { BankAccount } from "./bank_account.entity";

export interface IBankAccountTransferMethod {
  readonly id: number;
  type: string;
  readonly bank_account: BankAccount;
  readonly created_at: Date;
  readonly updated_at: Date;
}