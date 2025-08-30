import { ITransferMethod, TransferMethod } from "@domain/entities/transfer_method.entity";

type MapperInput = ITransferMethod

export function transfer_method_mapper(input: MapperInput): TransferMethod {
  return new TransferMethod(input)
}