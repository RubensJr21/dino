import { IBaseItemValue } from "@src/core/entities/base_item_value.entity";
import { MTag } from "./tag.model";
import { MTransferMethodType } from "./transfer_method_type.model";

export interface MBaseItemValue extends StrictOmit<Required<IBaseItemValue>, "tag"|"transfer_method_type">{
  tag_id: MTag["id"]
  transfer_method_type_id: MTransferMethodType["id"]
}