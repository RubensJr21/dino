import { IInstallment } from "@domain/entities/installment.entity";
import { MTag } from "./tag.model";
import { MTransferMethod } from "./transfer_method.model";

export interface MInstallment extends StrictOmit<Required<IInstallment>, "tag"|"transfer_method">{
  fk_id_tag: MTag["id"]
  fk_id_transfer_method: MTransferMethod["id"]
}