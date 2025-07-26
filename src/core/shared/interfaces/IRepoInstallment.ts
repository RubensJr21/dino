import { MInstallment } from "@src/core/models/installment.model";
import { MItemValue } from "@src/core/models/item_value.model";
import { Installment } from "../../entities/installment.entity";
import { ItemValue } from "../../entities/item_value.entity";
import { Result } from "../types/Result";

export type CreateInstallmentParams = StrictOmit<MInstallment, "id" | "created_at" | "updated_at">;
export type UpdateInstallmentParams = StrictOmit<MInstallment, "id" | "created_at" | "updated_at">

export interface IRepoInstallment {
  create(data: CreateInstallmentParams): Result<Installment>;
  findById(id: MInstallment["id"]): Result<Installment>; 
  findItemValue(installment_id: MInstallment["id"], item_value_id: MItemValue["id"]): Result<ItemValue>;
  findAll(): Result<Installment[]>;
  findAllByCashflowType(cashflow_type: ItemValue["cashflow_type"]): Result<Installment[]>;
  update(id: MInstallment["id"], data: UpdateInstallmentParams): Result<Installment>;
  delete(id: MInstallment["id"]): Result<boolean>
}