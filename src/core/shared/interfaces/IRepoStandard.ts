import { MStandard } from "@src/core/models/standard.model";
import { ItemValue } from "../../entities/item_value.entity";
import { Standard } from "../../entities/standard.entity";
import { build_internal_repo_error_generic } from "../types/BuildInternalRepoErrorGeneric";
import { RepoInterfaceNames } from "../types/RepoInterfaceNames";
import { RepoDomainError, RepoResult } from "../types/Result_v2";

export type CreateStandardParams = StrictOmit<MStandard, "id" | "created_at" | "updated_at">;
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