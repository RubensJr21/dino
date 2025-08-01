import { TransferMethod } from '@src/core/entities/transfer_method.entity'
import { MTransferMethod } from '@src/core/models/transfer_method.model'
import { CreateRepositoryParams, IRepository, UpdateRepositoryParams } from '@src/core/shared/interfaces/bases/IRepository'
import { InternalRepoErrors } from '../types/InternalRepoErrors'
import { Result } from '../types/Result'

export type CreateTransferMethodTypeParams = CreateRepositoryParams<MTransferMethod>
export type UpdateTransferMethodTypeParams = UpdateRepositoryParams<MTransferMethod>

export type InternalRepoErrorsTransferMethod = InternalRepoErrors<IRepoTransferMethod, "TransferMethod">

export interface IRepoTransferMethod extends IRepository<MTransferMethod, TransferMethod> {
  create(data: CreateTransferMethodTypeParams): Result<TransferMethod>;
  find_by_id(id: MTransferMethod["id"]): Result<TransferMethod>;
  find_by_method(method: MTransferMethod["method"]): Result<TransferMethod>;
  find_all(): Result<TransferMethod[]>;
  update(id: MTransferMethod["id"], data: UpdateTransferMethodTypeParams): Result<TransferMethod>;
  delete(id: MTransferMethod["id"]): Result<boolean>;
}