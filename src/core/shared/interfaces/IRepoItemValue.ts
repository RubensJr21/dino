import { ItemValue } from '@src/core/entities/item_value.entity';
import { MItemValue } from '@src/core/models/item_value.model';
import { build_internal_repo_error_generic } from '../types/BuildInternalRepoErrorGeneric';
import { RepoInterfaceNames } from '../types/RepoInterfaceNames';
import { RepoDomainError, RepoResult } from '../types/Result_v2';

export type CreateItemValueParams = StrictOmit<MItemValue, "id"|"created_at"|"updated_at">
export type UpdateItemValueParams = StrictOmit<MItemValue, "id"|"created_at"|"updated_at">

export interface IRepoItemValue {
  create(data: CreateItemValueParams): RepoResult<ItemValue, IRepoItemValue>;
  find_by_id(id: MItemValue["id"]): RepoResult<ItemValue, IRepoItemValue>;
  find_all(): RepoResult<ItemValue[], IRepoItemValue>;
  update(id: MItemValue["id"], data: UpdateItemValueParams): RepoResult<ItemValue, IRepoItemValue>;
  delete(id: MItemValue["id"]): RepoResult<boolean, IRepoItemValue>;
}

export function build_internal_repo_error_item_value(
  method_name: keyof IRepoItemValue,
  error: Error
): RepoDomainError<IRepoItemValue> {
  return build_internal_repo_error_generic<IRepoItemValue>(
    RepoInterfaceNames.ItemValue,
    method_name,
    error
  )
}