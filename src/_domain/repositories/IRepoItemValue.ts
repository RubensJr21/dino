import { RepoInterfaceNames } from '@core-types/enum/RepoInterfaceNames';
import { RepoDomainError, RepoResult } from '@core-types/Result_v2';
import { TypeOfVariants } from '@core-types/variants_items';
import { MItemValue } from '@core/models/item_value.model';
import { IItemValue, ItemValue } from '@domain/entities/item_value.entity';
import { Tag } from '@domain/entities/tag.entity';
import { TransferMethod } from '@domain/entities/transfer_method.entity';
import { build_internal_repo_error_generic } from '../../_core/utils/BuildInternalRepoErrorGeneric';

export interface CreateItemValueParams {
  cashflow_type: TypeOfVariants;
  scheduled_at: IItemValue["scheduled_at"];
  amount: IItemValue["amount"];
  was_processed: IItemValue["was_processed"];
  tag: Tag;
  transfer_method: TransferMethod;
}

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