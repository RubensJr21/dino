import { TransferMethod } from '@src/core/entities/transfer_method.entity'
import { MTransferMethod } from '@src/core/models/transfer_method.model'
import { CreateRepositoryParams, IRepository, UpdateRepositoryParams } from '@src/core/shared/interfaces/bases/IRepository'
import { Result } from '../types/Result'

export type CreateTransferMethodTypeParams = CreateRepositoryParams<MTransferMethod>
export type UpdateTransferMethodTypeParams = UpdateRepositoryParams<MTransferMethod>

export interface IRepoTransferMethod extends IRepository<MTransferMethod, TransferMethod> {
  create(data: CreateTransferMethodTypeParams): Result<TransferMethod>;
  findById(id: MTransferMethod["id"]): Result<TransferMethod>;
  findByMethod(method: MTransferMethod["method"]): Result<TransferMethod>;
  findAll(): Result<TransferMethod[]>;
  update(id: MTransferMethod["id"], data: UpdateTransferMethodTypeParams): Result<TransferMethod>;
  delete(id: MTransferMethod["id"]): Result<boolean>;
}