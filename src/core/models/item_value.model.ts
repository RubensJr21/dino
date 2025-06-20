import { IItemValue } from "@src/core/entities/item_value.entity";
import { MTag } from "./tag.model";
import { MTransferMethodType } from "./transfer_method_type.model";

export interface MItemValue extends StrictOmit<Required<IItemValue>, "tag"|"transfer_method_type">{
  fk_id_tag: MTag["id"]
  fk_id_transfer_method_type: MTransferMethodType["id"]
}