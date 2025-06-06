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

/**
 * Função que retorna se o objeto passado é um CreditCardNotFoundById
 * @param {unknown} error Objeto de Erro a ser verificado
 * @returns {error is CreditCardNotFoundById} Retorna se o objeto é do tipo CreditCardNotFoundById
 */
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

/**
 * Função que retorna se o objeto passado é um CreditCardNotFoundByNickname
 * @param {unknown} error Objeto de Erro a ser verificado
 * @returns {error is CreditCardNotFoundByNickname} Retorna se o objeto é do tipo CreditCardNotFoundByNickname
 */
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

/**
 * Função que retorna se o objeto passado é um CreditCardNicknameIsAlreadyInUse
 * @param {unknown} error Objeto de Erro a ser verificado
 * @returns {error is CreditCardNicknameIsAlreadyInUse} Retorna se o objeto é do tipo CreditCardNicknameIsAlreadyInUse
 */
// https://typescript.tv/errors/#ts1196
export function isCreditCardNicknameIsAlreadyInUse(error: unknown): error is CreditCardNicknameIsAlreadyInUse {
  return error instanceof CreditCardNicknameIsAlreadyInUse;
}

// END CreditCardNicknameIsAlreadyInUse Declaration

export class CreditCardUnknownError extends Error {
  readonly name: string = "CreditCardUnknownError";
  // eslint-disable-next-line jsdoc/require-jsdoc
  constructor(){
    super(`CreditCard not founded!`, {
      cause: `Unknown`
    })
  }
}

/**
 * Função que retorna se o objeto passado é um CreditCardUnknownError
 * @param {unknown} error Objeto de Erro a ser verificado
 * @returns {error is CreditCardUnknownError} Retorna se o objeto é do tipo CreditCardUnknownError
 */
// https://typescript.tv/errors/#ts1196
export function isCreditCardUnknownError(error: unknown): error is CreditCardUnknownError {
  return error instanceof CreditCardUnknownError;
}
// END CreditCardUnknownError Declaration