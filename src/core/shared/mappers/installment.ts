import { IInstallment, Installment } from "@src/core/entities/installment.entity";
import { ITag, Tag } from "@src/core/entities/tag.entity";
import { ITransferMethod, TransferMethod } from "@src/core/entities/transfer_method.entity";

interface MapperInput extends StrictOmit<IInstallment, "transfer_method" | "tag"> {
  transfer_method: ITransferMethod,
  tag: ITag
}

export function installment_mapper(input: MapperInput): Installment {
  return new Installment({
    ...input,
    transfer_method: new TransferMethod(input.transfer_method),
    tag: new Tag(input.tag),
  })
}