import { RepoInterfaceNames } from "@core-types/enum/RepoInterfaceNames";
import { RepoDomainError, RepoResult } from "@core-types/Result_v2";
import { MStandard } from "@core/models/standard.model";
import { build_internal_repo_error_generic } from "../../_core/utils/BuildInternalRepoErrorGeneric";
import { IItemValue, ItemValue } from "../entities/item_value.entity";
import { IStandard, Standard } from "../entities/standard.entity";

export interface CreateStandardParams {
  description: IStandard["description"];
  item_value_id: IItemValue["id"];
};

export type UpdateStandardParams = CreateStandardParams

export interface IRepoStandard {
  create(data: CreateStandardParams): RepoResult<Standard, IRepoStandard>;
  find_by_id(id: MStandard["id"]): RepoResult<Standard, IRepoStandard>;
  find_all(): RepoResult<Standard[], IRepoStandard>;
  find_all_by_cashflow_type(cashflow_type: ItemValue["cashflow_type"]): RepoResult<Standard[], IRepoStandard>;
  update(id: MStandard["id"], data: UpdateStandardParams): RepoResult<Standard, IRepoStandard>;
  delete(id: MStandard["id"]): RepoResult<boolean, IRepoStandard>;
}

export function build_internal_repo_error_standard(
  method_name: keyof IRepoStandard,
  error: Error
): RepoDomainError<IRepoStandard> {
  return build_internal_repo_error_generic<IRepoStandard>(
    RepoInterfaceNames.Standard,
    method_name,
    error
  )
}