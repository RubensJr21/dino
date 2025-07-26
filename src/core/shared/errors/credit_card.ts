import { CreditCard } from "@src/core/entities/credit_card.entity";

export class CreditCardNotFoundById extends Error {
  readonly name: string = "CreditCardNotFoundById";
  /**
   * @param {CreditCard["id"]} credit_card_id credit_card_id que gerou erro ao ser buscada
   */
  constructor(credit_card_id: CreditCard["id"]){
    super(`CreditCard id: '${credit_card_id}' not founded!`, {
      cause: `The credit_card id '${credit_card_id}' is invalid!`
    })
  }
}

// https://typescript.tv/errors/#ts1196
export function isCreditCardNotFoundById(error: unknown): error is CreditCardNotFoundById {
  return error instanceof CreditCardNotFoundById;
}

// END CreditCardNotFoundById Declaration

export class CreditCardNotFoundByNickname extends Error {
  readonly name: string = "CreditCardNotFoundByNickname";
  /**
   * @param {CreditCard["nickname"]} credit_card_nickname credit_card_nickname que gerou erro ao ser buscada
   */
  constructor(credit_card_nickname: CreditCard["nickname"]){
    super(`CreditCard nickname: '${credit_card_nickname}' not founded!`, {
      cause: `The nickname credit_card '${credit_card_nickname}' is invalid!`
    })
  }
}

// https://typescript.tv/errors/#ts1196
export function isCreditCardNotFoundByNickname(error: unknown): error is CreditCardNotFoundByNickname {
  return error instanceof CreditCardNotFoundByNickname;
}

// END CreditCardNotFoundByNickname Declaration

export class CreditCardNicknameIsAlreadyInUse extends Error {
  readonly name: string = "CreditCardNicknameIsAlreadyInUse";
  /**
   * @param {CreditCard["nickname"]} credit_card_nickname credit_card_nickname que gerou erro ao ser buscada
   */
 constructor(credit_card_nickname: CreditCard["nickname"]){
   super(`The CreditCard nickname: '${credit_card_nickname}' already in use!`)
  }
}

// https://typescript.tv/errors/#ts1196
export function isCreditCardNicknameIsAlreadyInUse(error: unknown): error is CreditCardNicknameIsAlreadyInUse {
  return error instanceof CreditCardNicknameIsAlreadyInUse;
}

// END CreditCardNicknameIsAlreadyInUse Declaration

export class CreditCardUnknownError extends Error {
  readonly name: string = "CreditCardUnknownError";
    constructor(){
    super(`CreditCard not founded!`, {
      cause: `Unknown`
    })
  }
}

// https://typescript.tv/errors/#ts1196
export function isCreditCardUnknownError(error: unknown): error is CreditCardUnknownError {
  return error instanceof CreditCardUnknownError;
}
// END CreditCardUnknownError Declaration