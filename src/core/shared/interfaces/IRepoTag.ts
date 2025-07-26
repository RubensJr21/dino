import { Tag } from '@src/core/entities/tag.entity'
import { MTag } from '@src/core/models/tag.model'
import { CreateRepositoryParams, IRepository, UpdateRepositoryParams } from "@src/core/shared/interfaces/IRepository"
import { Result } from '../types/Result'

export type CreateTagParams = CreateRepositoryParams<MTag>
export type UpdateTagParams = UpdateRepositoryParams<MTag>

export interface IRepoTag extends IRepository<MTag, Tag> {
  create(data: CreateTagParams): Result<Tag>;
  findById(id: Tag["id"]): Result<Tag>;
  findByDescription(description: string): Result<Tag>;
  findAll(): Result<Tag[]>;
  update(id: MTag["id"], data: UpdateTagParams): Result<Tag>;
  delete(id: number): Result<boolean>;
}