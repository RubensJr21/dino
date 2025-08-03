import { BankAccount } from "@core/entities/bank_account.entity";
import { BankAccountTransferMethod } from "@src/core/entities/bank_account_transfer_method.entity";
import { MBankAccountTransferMethod } from "@src/core/models/bank_account_transfer_method.model";
import { build_internal_repo_error_generic } from "../types/BuildInternalRepoErrorGeneric";
import { RepoInterfaceNames } from "../types/RepoInterfaceNames";
import { RepoDomainError, RepoResult } from "../types/Result_v2";
import { CreateRepositoryWithDatesParams, IRepositoryWithDates, UpdateRepositoryWithDatesParams } from "./bases/IRepositoryWithDates_v2";

export type CreateBankAccountTransferMethodTypeParams = CreateRepositoryWithDatesParams<MBankAccountTransferMethod>
export type UpdateBankAccountTransferMethodTypeParams = UpdateRepositoryWithDatesParams<MBankAccountTransferMethod>

export interface IRepoBankAccountTransferMethod 
extends IRepositoryWithDates<MBankAccountTransferMethod, BankAccountTransferMethod, IRepoBankAccountTransferMethod> {
  create(data: CreateBankAccountTransferMethodTypeParams): RepoResult<BankAccountTransferMethod, IRepoBankAccountTransferMethod>;
  find_by_id(id: MBankAccountTransferMethod["id"]): RepoResult<BankAccountTransferMethod, IRepoBankAccountTransferMethod>;
  find_by_bank_account_id(bank_account_id: BankAccount["id"]): RepoResult<BankAccountTransferMethod[], IRepoBankAccountTransferMethod>;
  find_all(): RepoResult<BankAccountTransferMethod[], IRepoBankAccountTransferMethod>;
  find_all_of_bank_account(bank_account_id: BankAccount["id"]): RepoResult<BankAccountTransferMethod[], IRepoBankAccountTransferMethod>;
  update(id: BankAccountTransferMethod["id"], data: UpdateBankAccountTransferMethodTypeParams): RepoResult<BankAccountTransferMethod, IRepoBankAccountTransferMethod>;
  delete(id: BankAccountTransferMethod["id"]): RepoResult<boolean, IRepoBankAccountTransferMethod>;
}

export function build_internal_repo_error_bank_account_transfer_method(
  method_name: keyof IRepoBankAccountTransferMethod,
  error: Error
): RepoDomainError<IRepoBankAccountTransferMethod> {
  return build_internal_repo_error_generic<IRepoBankAccountTransferMethod>(
    RepoInterfaceNames.BankAccountTransferMethod,
    method_name,
    error
  )
}