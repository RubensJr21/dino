import { RecurrenceType } from '@src/core/entities/recurrence_type.entity'
import { MRecurrenceType } from '@src/core/models/recurrence_type.model'
import { CreateRepositoryParams, IRepository, UpdateRepositoryParams } from "@src/core/shared/interfaces/bases/IRepository"
import { InternalRepoErrors } from '../types/InternalRepoErrors'
import { Result } from '../types/Result'

export type CreateRecurrenceTypeParams = CreateRepositoryParams<MRecurrenceType>
export type UpdateRecurrenceTypeParams = UpdateRepositoryParams<MRecurrenceType>

export type InternalRepoErrorsRecurrenceType = InternalRepoErrors<IRepoRecurrenceType, "RecurrenceType">

export interface IRepoRecurrenceType extends IRepository<MRecurrenceType, RecurrenceType> {
  create(data: CreateRecurrenceTypeParams): Result<RecurrenceType>;
  find_by_id(id: MRecurrenceType["id"]): Result<RecurrenceType>;
  find_by_type(type: string): Result<RecurrenceType>;
  find_all(): Result<RecurrenceType[]>;
  update(id: MRecurrenceType["id"], data: UpdateRecurrenceTypeParams): Result<RecurrenceType>;
  delete(id: MRecurrenceType["id"]): Result<boolean>;
}