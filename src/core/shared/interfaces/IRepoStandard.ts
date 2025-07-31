import { MStandard } from "@src/core/models/standard.model";
import { ItemValue } from "../../entities/item_value.entity";
import { Standard } from "../../entities/standard.entity";
import { Result } from "../types/Result";

export type CreateStandardParams = StrictOmit<MStandard, "id" | "created_at" | "updated_at">;
export type UpdateStandardParams = CreateStandardParams

export interface IRepoStandard {
  create(data: CreateStandardParams): Result<Standard>;
  find_by_id(id: MStandard["id"]): Result<Standard>;
  find_all(): Result<Standard[]>;
  find_all_by_cashflow_type(cashflow_type: ItemValue["cashflow_type"]): Result<Standard[]>;
  update(id: MStandard["id"], data: UpdateStandardParams): Result<Standard>;
  delete(id: MStandard["id"]): Result<boolean>;
}