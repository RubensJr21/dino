import { RecurrenceType } from "@src/core/entities/recurrence_type.entity";
import { Tag } from "@src/core/entities/tag.entity";
import { TransferMethod } from "@src/core/entities/transfer_method.entity";
import { MItemValue } from "@src/core/models/item_value.model";
import { MRecurring } from "@src/core/models/recurring.model";
import { ItemValue } from "../../entities/item_value.entity";
import { IRecurring, Recurring } from "../../entities/recurring.entity";
import { build_internal_repo_error_generic } from "../types/BuildInternalRepoErrorGeneric";
import { RepoInterfaceNames } from "../types/RepoInterfaceNames";
import { RepoDomainError, RepoResult } from "../types/Result_v2";

export interface CreateRecurringParams {
  is_disabled: IRecurring["is_disabled"];
  start_date: IRecurring["start_date"];
  current_amount: IRecurring["current_amount"];
  tag: Tag;
  transfer_method: TransferMethod;
  recurrence_type: RecurrenceType;
};

export type UpdateRecurringParams = StrictOmit<MRecurring, "id" | "fk_id_recurrence_type" | "created_at" | "updated_at">

export interface IRepoRecurring {
  create(data: CreateRecurringParams): RepoResult<Recurring, IRepoRecurring>;
  register_next_recurring(id: MRecurring["id"], item_value_id: MItemValue["id"]): RepoResult<boolean, IRepoRecurring>;
  find_by_id(id: MRecurring["id"]): RepoResult<Recurring, IRepoRecurring>;
  find_item_value(recurring_id: MRecurring["id"], item_value_id: MItemValue["id"]): RepoResult<ItemValue, IRepoRecurring>;
  find_all(): RepoResult<Recurring[], IRepoRecurring>;
  find_all_item_value(recurring_id: MRecurring["id"]): RepoResult<ItemValue[], IRepoRecurring>;
  find_all_by_cashflow_type(cashflow_type: ItemValue["cashflow_type"]): RepoResult<Recurring[], IRepoRecurring>;
  update(id: MRecurring["id"], data: UpdateRecurringParams): RepoResult<Recurring, IRepoRecurring>;
  delete(id: MRecurring["id"]): RepoResult<boolean, IRepoRecurring>;
}

export function build_internal_repo_error_recurring(
  method_name: keyof IRepoRecurring,
  error: Error
): RepoDomainError<IRepoRecurring> {
  return build_internal_repo_error_generic<IRepoRecurring>(
    RepoInterfaceNames.Recurring,
    method_name,
    error
  )
}