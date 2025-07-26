import { BankAccount } from "@src/core/entities/bank_account.entity";

export class BankAccountNotFoundById extends Error {
  readonly name: string = "BankAccountNotFoundById";
  /**
   * @param {BankAccount["id"]} bank_account_id bank_account_id que gerou erro ao ser buscada
   */
  constructor(bank_account_id: BankAccount["id"]){
    super(`BankAccount id: '${bank_account_id}' not founded!`, {
      cause: `The bank_account id '${bank_account_id}' is invalid!`
    })
  }
}

// https://typescript.tv/errors/#ts1196
export function isBankAccountNotFoundById(error: unknown): error is BankAccountNotFoundById {
  return error instanceof BankAccountNotFoundById;
}

// END BankAccountNotFoundById Declaration

export class BankAccountNotFoundByNickname extends Error {
  readonly name: string = "BankAccountNotFoundByNickname";
  constructor(bank_account_nickname: BankAccount["nickname"]){
    super(`BankAccount nickname: '${bank_account_nickname}' not founded!`, {
      cause: `The nickname bank_account '${bank_account_nickname}' is invalid!`
    })
  }
}

// https://typescript.tv/errors/#ts1196
export function isBankAccountNotFoundByNickname(error: unknown): error is BankAccountNotFoundByNickname {
  return error instanceof BankAccountNotFoundByNickname;
}

// END BankAccountNotFoundByNickname Declaration

export class BankAccountNicknameIsAlreadyInUse extends Error {
  readonly name: string = "BankAccountNicknameIsAlreadyInUse";
 constructor(bank_account_nickname: BankAccount["nickname"]){
   super(`The BankAccount nickname: ''${bank_account_nickname}'' already in use!`)
  }
}

// https://typescript.tv/errors/#ts1196
export function isBankAccountNicknameIsAlreadyInUse(error: unknown): error is BankAccountNicknameIsAlreadyInUse {
  return error instanceof BankAccountNicknameIsAlreadyInUse;
}

// END BankAccountNicknameIsAlreadyInUse Declaration

export class BankAccountUnknownError extends Error {
  readonly name: string = "BankAccountUnknownError";
    constructor(){
    super(`BankAccount not founded!`, {
      cause: `Unknown`
    })
  }
}

// https://typescript.tv/errors/#ts1196
export function isBankAccountUnknownError(error: unknown): error is BankAccountUnknownError {
  return error instanceof BankAccountUnknownError;
}
// END BankAccountUnknownError Declaration