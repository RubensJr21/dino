import { MItemValue } from "@src/core/models/item_value.model";
import { MRecurring } from "@src/core/models/recurring.model";
import { ItemValue } from "../../entities/item_value.entity";
import { Recurring } from "../../entities/recurring.entity";
import { Result } from "../types/Result";

export type CreateRecurringParams = StrictOmit<MRecurring, "id" | "created_at" | "updated_at">;
export type UpdateRecurringParams = StrictOmit<MRecurring, "id" | "fk_id_recurrence_type" | "created_at" | "updated_at">

export interface IRepoRecurring {
  create(data: CreateRecurringParams): Result<Recurring>;
  registerNextRecurring(id: MRecurring["id"], item_value_id: MItemValue["id"]): Result<boolean>;
  findById(id: MRecurring["id"]): Result<Recurring>;
  findItemValue(recurring_id: MRecurring["id"], item_value_id: MItemValue["id"]): Result<ItemValue>;
  findAll(): Result<Recurring[]>;
  findAllItemValue(recurring_id: MRecurring["id"]): Result<ItemValue[]>;
  findAllByCashflowType(cashflow_type: ItemValue["cashflow_type"]): Result<Recurring[]>;
  update(id: MRecurring["id"], data: UpdateRecurringParams): Result<Recurring>;
  delete(id: MRecurring["id"]): Result<boolean>
}