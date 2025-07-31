import { BankAccount } from "@src/core/entities/bank_account.entity";
import { MBankAccount } from "@src/core/models/bank_account.model";
import { CreateRepositoryWithDatesParams, IRepositoryWithDates, UpdateRepositoryWithDatesParams } from "@src/core/shared/interfaces/bases/IRepositoryWithDates";
import { Result } from "../types/Result";

export type CreateBankAccountParams = CreateRepositoryWithDatesParams<MBankAccount>
export type UpdateBankAccountParams = UpdateRepositoryWithDatesParams<MBankAccount>

export interface IRepoBankAccount extends IRepositoryWithDates<MBankAccount, BankAccount> {
  create(data: CreateBankAccountParams): Result<BankAccount>
  find_by_id(id: MBankAccount["id"]): Result<BankAccount>
  find_by_nickname(nickname: MBankAccount["nickname"]): Result<BankAccount>
  find_all(): Result<BankAccount[]>
  update(id: MBankAccount["id"], data: UpdateBankAccountParams): Result<BankAccount>
  delete(id: MBankAccount["id"]): Result<boolean>
}