import { IItemValue } from "@src/core/entities/item_value.entity";
import { IStandard, Standard } from "@src/core/entities/standard.entity";
import { ITag } from "@src/core/entities/tag.entity";
import { ITransferMethod } from "@src/core/entities/transfer_method.entity";
import { item_value_mapper } from "./item_value";

interface _IItemValue extends StrictOmit<IItemValue, "tag"|"transfer_method"> {
  tag: ITag,
  transfer_method: ITransferMethod
}

interface MapperInput extends StrictOmit<IStandard, "item_value"> {
  item_value: _IItemValue
}

export function standard_mapper(input: MapperInput): Standard {
  return new Standard({
    ...input,
    item_value: item_value_mapper(input.item_value),
  })
}