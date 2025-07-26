import { RecurrenceType } from '@src/core/entities/recurrence_type.entity'
import { MRecurrenceType } from '@src/core/models/recurrence_type.model'
import { CreateRepositoryParams, IRepository, UpdateRepositoryParams } from "@src/core/shared/interfaces/IRepository"
import { Result } from '../types/Result'

export type CreateRecurrenceTypeParams = CreateRepositoryParams<MRecurrenceType>
export type UpdateRecurrenceTypeParams = UpdateRepositoryParams<MRecurrenceType>

export interface IRepoRecurrenceType extends IRepository<MRecurrenceType, RecurrenceType> {
  create(data: CreateRecurrenceTypeParams): Result<RecurrenceType>;
  findById(id: MRecurrenceType["id"]): Result<RecurrenceType>;
  findByType(type: string): Result<RecurrenceType>;
  findAll(): Result<RecurrenceType[]>;
  update(id: MRecurrenceType["id"], data: UpdateRecurrenceTypeParams): Result<RecurrenceType>;
  delete(id: MRecurrenceType["id"]): Result<boolean>;
}