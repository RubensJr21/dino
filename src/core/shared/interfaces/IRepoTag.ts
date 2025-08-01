import { Tag } from '@src/core/entities/tag.entity'
import { MTag } from '@src/core/models/tag.model'
import { CreateRepositoryParams, IRepository, UpdateRepositoryParams } from "@src/core/shared/interfaces/bases/IRepository"
import { InternalRepoErrors } from '../types/InternalRepoErrors'
import { Result } from '../types/Result'

export type CreateTagParams = CreateRepositoryParams<MTag>
export type UpdateTagParams = UpdateRepositoryParams<MTag>

export type InternalRepoErrorsTag = InternalRepoErrors<IRepoTag, "Tag">

export interface IRepoTag extends IRepository<MTag, Tag> {
  create(data: CreateTagParams): Result<Tag>;
  find_by_id(id: Tag["id"]): Result<Tag>;
  find_by_description(description: string): Result<Tag>;
  find_all(): Result<Tag[]>;
  update(id: MTag["id"], data: UpdateTagParams): Result<Tag>;
  delete(id: number): Result<boolean>;
}