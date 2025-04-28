import { IBankAccount } from "./bank_account.entity";

export interface IBankAccountTransferMethod {
  readonly id: number;
  type: string;
  bank_account: IBankAccount;
  readonly created_at: Date;
  readonly updated_at: Date;
}