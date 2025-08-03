import { MInstallment } from "@src/core/models/installment.model";
import { MItemValue } from "@src/core/models/item_value.model";
import { Installment } from "../../entities/installment.entity";
import { ItemValue } from "../../entities/item_value.entity";
import { build_internal_repo_error_generic } from "../types/BuildInternalRepoErrorGeneric";
import { RepoInterfaceNames } from "../types/RepoInterfaceNames";
import { RepoDomainError, RepoResult } from "../types/Result_v2";

export type CreateInstallmentParams = StrictOmit<MInstallment, "id" | "created_at" | "updated_at">;
export type UpdateInstallmentParams = Pick<MInstallment, "description">;

export interface IRepoInstallment {
  create(data: CreateInstallmentParams): RepoResult<Installment, IRepoInstallment>;
  register_installments(id: MInstallment["id"], item_value_id_list: Array<ItemValue["id"]>): RepoResult<boolean, IRepoInstallment>;
  find_by_id(id: MInstallment["id"]): RepoResult<Installment, IRepoInstallment>; 
  find_item_value(installment_id: MInstallment["id"], item_value_id: MItemValue["id"]): RepoResult<ItemValue, IRepoInstallment>;
  find_all(): RepoResult<Installment[], IRepoInstallment>;
  find_all_item_value(id: MInstallment["id"]): RepoResult<ItemValue[], IRepoInstallment>;
  find_all_by_cashflow_type(cashflow_type: ItemValue["cashflow_type"]): RepoResult<Installment[], IRepoInstallment>;
  update(id: MInstallment["id"], data: UpdateInstallmentParams): RepoResult<Installment, IRepoInstallment>;
  delete(id: MInstallment["id"]): RepoResult<boolean, IRepoInstallment>;
}

export function build_internal_repo_error_installment(
  method_name: keyof IRepoInstallment,
  error: Error
): RepoDomainError<IRepoInstallment> {
  return build_internal_repo_error_generic<IRepoInstallment>(
    RepoInterfaceNames.Installment,
    method_name,
    error
  )
}