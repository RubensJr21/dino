import { IInstallment, Installment } from "@domain/entities/installment.entity";
import { ITag, Tag } from "@domain/entities/tag.entity";
import { ITransferMethod, TransferMethod } from "@domain/entities/transfer_method.entity";

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