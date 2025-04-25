import { IBankAccount } from "./bank_account.entity";

export interface IBankAccountTransferMethod {
  readonly id: number;
  type: string;
  bank_account: IBankAccount;
  created_at: Date;
  updated_at: Date;
}