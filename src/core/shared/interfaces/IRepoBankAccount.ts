import { BankAccount } from "@src/core/entities/bank_account.entity";
import { MBankAccount } from "@src/core/models/bank_account.model";
import { CreateRepositoryWithDatesParams, IRepositoryWithDates, UpdateRepositoryWithDatesParams } from "@src/core/shared/interfaces/bases/IRepositoryWithDates_v2";
import { build_internal_repo_error_generic } from "../types/BuildInternalRepoErrorGeneric";
import { RepoInterfaceNames } from "../types/RepoInterfaceNames";
import { RepoDomainError, RepoResult } from "../types/Result_v2";

export type CreateBankAccountParams = CreateRepositoryWithDatesParams<MBankAccount>
export type UpdateBankAccountParams = UpdateRepositoryWithDatesParams<MBankAccount>

export interface IRepoBankAccount extends IRepositoryWithDates<MBankAccount, BankAccount, IRepoBankAccount> {
  create(data: CreateBankAccountParams): RepoResult<BankAccount, IRepoBankAccount>
  find_by_id(id: MBankAccount["id"]): RepoResult<BankAccount, IRepoBankAccount>
  find_by_nickname(nickname: MBankAccount["nickname"]): RepoResult<BankAccount, IRepoBankAccount>
  find_all(): RepoResult<BankAccount[], IRepoBankAccount>
  update(id: MBankAccount["id"], data: UpdateBankAccountParams): RepoResult<BankAccount, IRepoBankAccount>
  delete(id: MBankAccount["id"]): RepoResult<boolean, IRepoBankAccount>
}

export function build_internal_repo_error_bank_account(
  method_name: keyof IRepoBankAccount,
  error: Error
): RepoDomainError<IRepoBankAccount> {
  return build_internal_repo_error_generic<IRepoBankAccount>(
    RepoInterfaceNames.BankAccount,
    method_name,
    error
  )
}