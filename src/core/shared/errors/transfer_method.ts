import { TransferMethod } from "@src/core/entities/transfer_method.entity";

export class TransferMethodNotFoundById extends Error {
  readonly name: string = "TransferMethodNotFoundById";
  
  constructor(tmt_id: TransferMethod["id"]){
    super(`Transfer Method Type '${tmt_id}' not founded!`, {
      cause: `The transfer method type id '${tmt_id}' is invalid!`
    })
  }
}

// https://typescript.tv/errors/#ts1196
export function isTransferMethodNotFoundById(error: unknown): error is TransferMethodNotFoundById {
  return error instanceof TransferMethodNotFoundById;
}

// END TransferMethodNotFoundById Declaration

export class TransferMethodNotFoundByNickname extends Error {
  readonly name: string = "TransferMethodNotFoundByNickname";
  
  constructor(transfer_method_nickname: TransferMethod["method"]){
    super(`TransferMethod method: '${transfer_method_nickname}' not founded!`, {
      cause: `The method transfer_method '${transfer_method_nickname}' is invalid!`
    })
  }
}

// https://typescript.tv/errors/#ts1196
export function isTransferMethodNotFoundByNickname(error: unknown): error is TransferMethodNotFoundByNickname {
  return error instanceof TransferMethodNotFoundByNickname;
}

// END TransferMethodNotFoundByNickname Declaration