import { IItemValue, ItemValue } from "@domain/entities/item_value.entity";
import { ITag, Tag } from "@domain/entities/tag.entity";
import { ITransferMethod, TransferMethod } from "@domain/entities/transfer_method.entity";

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