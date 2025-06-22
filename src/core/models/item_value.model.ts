import { IItemValue } from "@src/core/entities/item_value.entity";
import { MTag } from "./tag.model";
import { MTransferMethod } from "./transfer_method.model";

export interface MItemValue extends StrictOmit<Required<IItemValue>, "tag"|"transfer_method">{
  fk_id_tag: MTag["id"]
  fk_id_transfer_method: MTransferMethod["id"]
}