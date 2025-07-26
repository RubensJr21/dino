import { IItemValue, ItemValue } from "@src/core/entities/item_value.entity";
import { ITag, Tag } from "@src/core/entities/tag.entity";
import { ITransferMethod, TransferMethod } from "@src/core/entities/transfer_method.entity";

interface MapperInput extends StrictOmit<IItemValue, "transfer_method" | "tag"> {
  transfer_method: ITransferMethod,
  tag: ITag
}

export function item_value_mapper(input: MapperInput): ItemValue {
  return new ItemValue({
    ...input,
    transfer_method: new TransferMethod(input.transfer_method),
    tag: new Tag(input.tag),
  })
}