import { RepoInterfaceNames } from '@core-types/enum/RepoInterfaceNames'
import { RepoDomainError, RepoResult } from '@core-types/Result_v2'
import { MTransferMethod } from '@core/models/transfer_method.model'
import { TransferMethod } from '@domain/entities/transfer_method.entity'
import { CreateRepositoryParams, IRepository, UpdateRepositoryParams } from '@domain/repositories/IRepository_v2'
import { build_internal_repo_error_generic } from '../../_core/utils/BuildInternalRepoErrorGeneric'

export type CreateTransferMethodTypeParams = CreateRepositoryParams<MTransferMethod>
export type UpdateTransferMethodTypeParams = UpdateRepositoryParams<MTransferMethod>

export interface IRepoTransferMethod extends IRepository<MTransferMethod, TransferMethod, IRepoTransferMethod> {
  create(data: CreateTransferMethodTypeParams): RepoResult<TransferMethod, IRepoTransferMethod>;
  find_by_id(id: MTransferMethod["id"]): RepoResult<TransferMethod, IRepoTransferMethod>;
  find_by_method(method: MTransferMethod["method"]): RepoResult<TransferMethod, IRepoTransferMethod>;
  find_all(): RepoResult<TransferMethod[], IRepoTransferMethod>;
  update(id: MTransferMethod["id"], data: UpdateTransferMethodTypeParams): RepoResult<TransferMethod, IRepoTransferMethod>;
  delete(id: MTransferMethod["id"]): RepoResult<boolean, IRepoTransferMethod>;
}

export function build_internal_repo_error_transfer_method(
  method_name: keyof IRepoTransferMethod,
  error: Error
): RepoDomainError<IRepoTransferMethod> {
  return build_internal_repo_error_generic<IRepoTransferMethod>(
    RepoInterfaceNames.TransferMethod,
    method_name,
    error
  )
}