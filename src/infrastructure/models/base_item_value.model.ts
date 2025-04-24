import { IBaseItemValue } from "@src/core/entities/base_item_value.entity";
import { ITag } from "@src/core/entities/tag.entity";
import { ITransferMethodType } from "@src/core/entities/transfer_method_type.entity";

export interface MBaseItemValue extends StrictOmit<Required<IBaseItemValue>, "tag"|"transfer_method_type">{
  tag_id: Required<ITag>["id"]
  transfer_method_type_id: Required<ITransferMethodType>["id"]
}