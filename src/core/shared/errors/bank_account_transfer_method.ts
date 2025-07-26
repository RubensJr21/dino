import { BankAccountTransferMethod } from "@src/core/entities/bank_account_transfer_method.entity";

export class BankAccountTransferMethodNotFoundById extends Error {
  readonly name: string = "BankAccountTransferMethodNotFoundById";
  constructor(bank_account_id: BankAccountTransferMethod["id"]){
    super(`BankAccountTransferMethod id: '${bank_account_id}' not founded!`, {
      cause: `The bank_account id '${bank_account_id}' is invalid!`
    })
  }
}

// https://typescript.tv/errors/#ts1196
export function isBankAccountTransferMethodNotFoundById(error: unknown): error is BankAccountTransferMethodNotFoundById {
  return error instanceof BankAccountTransferMethodNotFoundById;
}

// END BankAccountTransferMethodNotFoundById Declaration

export class BankAccountTransferMethodUnknownError extends Error {
  readonly name: string = "BankAccountTransferMethodUnknownError";
    constructor(){
    super(`BankAccountTransferMethod not founded!`, {
      cause: `Unknown`
    })
  }
}

// https://typescript.tv/errors/#ts1196
export function isBankAccountTransferMethodUnknownError(error: unknown): error is BankAccountTransferMethodUnknownError {
  return error instanceof BankAccountTransferMethodUnknownError;
}
// END BankAccountTransferMethodUnknownError Declaration