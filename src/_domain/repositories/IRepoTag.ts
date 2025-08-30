import { RepoInterfaceNames } from '@core-types/enum/RepoInterfaceNames'
import { RepoDomainError, RepoResult } from '@core-types/Result_v2'
import { MTag } from '@core/models/tag.model'
import { Tag } from '@domain/entities/tag.entity'
import { CreateRepositoryParams, IRepository, UpdateRepositoryParams } from "@domain/repositories/IRepository_v2"
import { build_internal_repo_error_generic } from '../../_core/utils/BuildInternalRepoErrorGeneric'

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