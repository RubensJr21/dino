import { Tag } from '@src/core/entities/tag.entity'
import { MTag } from '@src/core/models/tag.model'
import { CreateRepositoryParams, IRepository, UpdateRepositoryParams } from "@src/core/shared/interfaces/bases/IRepository_v2"
import { build_internal_repo_error_generic } from '../types/BuildInternalRepoErrorGeneric'
import { RepoInterfaceNames } from '../types/RepoInterfaceNames'
import { RepoDomainError, RepoResult } from '../types/Result_v2'

export type CreateTagParams = CreateRepositoryParams<MTag>
export type UpdateTagParams = UpdateRepositoryParams<MTag>

export interface IRepoTag extends IRepository<MTag, Tag, IRepoTag> {
  create(data: CreateTagParams): RepoResult<Tag, IRepoTag>;
  find_by_id(id: Tag["id"]): RepoResult<Tag, IRepoTag>;
  find_by_description(description: string): RepoResult<Tag, IRepoTag>;
  find_all(): RepoResult<Tag[], IRepoTag>;
  update(id: MTag["id"], data: UpdateTagParams): RepoResult<Tag, IRepoTag>;
  delete(id: number): RepoResult<boolean, IRepoTag>;
}

export function build_internal_repo_error_tag(
  method_name: keyof IRepoTag,
  error: Error
): RepoDomainError<IRepoTag> {
  return build_internal_repo_error_generic<IRepoTag>(
    RepoInterfaceNames.Tag,
    method_name,
    error
  )
}