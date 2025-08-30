import { RepoInterfaceNames } from "@core-types/enum/RepoInterfaceNames";
import { RepoDomainError, RepoResult } from "@core-types/Result_v2";
import { MBankAccount } from "@core/models/bank_account.model";
import { BankAccount } from "@domain/entities/bank_account.entity";
import { CreateRepositoryWithDatesParams, IRepositoryWithDates, UpdateRepositoryWithDatesParams } from "@domain/repositories/IRepositoryWithDates_v2";
import { build_internal_repo_error_generic } from "../../_core/utils/BuildInternalRepoErrorGeneric";

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