import { ITransferMethod, TransferMethod } from "@src/core/entities/transfer_method.entity";

export function transfer_method_mapper(input: ITransferMethod): TransferMethod {
  return new TransferMethod(input)
}