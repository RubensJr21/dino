import { RepoInterfaceNames } from "@core-types/enum/RepoInterfaceNames";
import { RepoDomainError, RepoResult } from "@core-types/Result_v2";
import { MItemValue } from "@core/models/item_value.model";
import { MRecurring } from "@core/models/recurring.model";
import { RecurrenceType } from "@domain/entities/recurrence_type.entity";
import { Tag } from "@domain/entities/tag.entity";
import { TransferMethod } from "@domain/entities/transfer_method.entity";
import { build_internal_repo_error_generic } from "../../_core/utils/BuildInternalRepoErrorGeneric";
import { ItemValue } from "../entities/item_value.entity";
import { IRecurring, Recurring } from "../entities/recurring.entity";

export interface CreateRecurringParams {
  description: IRecurring["description"];
  is_disabled: IRecurring["is_disabled"];
  start_date: IRecurring["start_date"];
  current_amount: IRecurring["current_amount"];
  tag: Tag;
  transfer_method: TransferMethod;
  recurrence_type: RecurrenceType;
};

export type UpdateRecurringParams = StrictOmit<MRecurring, "id" | "created_at" | "updated_at">

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