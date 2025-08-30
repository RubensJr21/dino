import { RepoInterfaceNames } from '@core-types/enum/RepoInterfaceNames'
import { RepoDomainError, RepoResult } from '@core-types/Result_v2'
import { MRecurrenceType } from '@core/models/recurrence_type.model'
import { RecurrenceType } from '@domain/entities/recurrence_type.entity'
import { CreateRepositoryParams, IRepository, UpdateRepositoryParams } from "@domain/repositories/IRepository_v2"
import { build_internal_repo_error_generic } from '../../_core/utils/BuildInternalRepoErrorGeneric'

export type CreateRecurrenceTypeParams = CreateRepositoryParams<MRecurrenceType>
export type UpdateRecurrenceTypeParams = UpdateRepositoryParams<MRecurrenceType>

type RepositoryInterface = IRepository<MRecurrenceType, RecurrenceType, IRepoRecurrenceType>

export interface IRepoRecurrenceType extends RepositoryInterface {
  create(data: CreateRecurrenceTypeParams): ReturnType<RepositoryInterface["create"]>;
  find_by_id(id: MRecurrenceType["id"]): ReturnType<RepositoryInterface["find_by_id"]>;
  find_by_type(type: string): RepoResult<RecurrenceType, IRepoRecurrenceType>;
  find_all(): ReturnType<RepositoryInterface["find_all"]>;
  update(id: MRecurrenceType["id"], data: UpdateRecurrenceTypeParams): ReturnType<RepositoryInterface["update"]>;
  delete(id: MRecurrenceType["id"]): ReturnType<RepositoryInterface["delete"]>;
}

export function build_internal_repo_error_recurrence_type(
  method_name: keyof IRepoRecurrenceType,
  error: Error
): RepoDomainError<IRepoRecurrenceType> {
  return build_internal_repo_error_generic<IRepoRecurrenceType>(
    RepoInterfaceNames.RecurrenceType,
    method_name,
    error
  )
}