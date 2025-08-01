import { MInstallment } from "@src/core/models/installment.model";
import { MItemValue } from "@src/core/models/item_value.model";
import { Installment } from "../../entities/installment.entity";
import { ItemValue } from "../../entities/item_value.entity";
import { InternalRepoErrors } from "../types/InternalRepoErrors";
import { Result } from "../types/Result";

export type CreateInstallmentParams = StrictOmit<MInstallment, "id" | "created_at" | "updated_at">;
export type UpdateInstallmentParams = Pick<MInstallment, "description">;

export type InternalRepoErrorsInstallment = InternalRepoErrors<IRepoInstallment, "TransferMethod">

export interface IRepoInstallment {
  create(data: CreateInstallmentParams): Result<Installment>;
  registerInstallments(id: MInstallment["id"], item_value_id_list: Array<ItemValue["id"]>): Result<boolean>;
  find_by_id(id: MInstallment["id"]): Result<Installment>; 
  find_item_value(installment_id: MInstallment["id"], item_value_id: MItemValue["id"]): Result<ItemValue>;
  find_all(): Result<Installment[]>;
  find_all_item_value(id: MInstallment["id"]): Result<ItemValue[]>;
  find_all_by_cashflow_type(cashflow_type: ItemValue["cashflow_type"]): Result<Installment[]>;
  update(id: MInstallment["id"], data: UpdateInstallmentParams): Result<Installment>;
  delete(id: MInstallment["id"]): Result<boolean>
}