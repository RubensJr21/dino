import { BankAccount } from "./bank_account.entity";

export interface BankAccountTransferMethod {
    readonly id: number;
    type: string;
    bank_account: BankAccount;
    created_at: Date;
    updated_at: Date;
}