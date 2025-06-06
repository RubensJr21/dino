import { BaseItemValue_CreditCard } from "@src/core/entities/base_item_value-credit_card.entity";
import { BaseItemValue } from "@src/core/entities/base_item_value.entity";

export class BaseItemValueCreditCardNotFoundById extends Error {
  readonly name: string = "BaseItemValueCreditCardNotFoundById";
  /**
   * @param {BaseItemValue_CreditCard["id"]} bank_account_id bank_account_id que gerou erro ao ser buscada
   */
  constructor(bank_account_id: BaseItemValue_CreditCard<BaseItemValue>["id"]){
    super(`BaseItemValue_CreditCard id: '${bank_account_id}' not founded!`, {
      cause: `The bank_account id '${bank_account_id}' is invalid!`
    })
  }
}

/**
 * Função que retorna se o objeto passado é um BaseItemValueCreditCardNotFoundById
 * @param {unknown} error Objeto de Erro a ser verificado
 * @returns {error is BaseItemValueCreditCardNotFoundById} Retorna se o objeto é do tipo BaseItemValueCreditCardNotFoundById
 */
// https://typescript.tv/errors/#ts1196
export function isBaseItemValueCreditCardNotFoundById(error: unknown): error is BaseItemValueCreditCardNotFoundById {
  return error instanceof BaseItemValueCreditCardNotFoundById;
}

// END BaseItemValueCreditCardNotFoundById Declaration

export class BaseItemValueCreditCardUnknownError extends Error {
  readonly name: string = "BaseItemValueCreditCardUnknownError";
  // eslint-disable-next-line jsdoc/require-jsdoc
  constructor(){
    super(`BaseItemValue_CreditCard not founded!`, {
      cause: `Unknown`
    })
  }
}

/**
 * Função que retorna se o objeto passado é um BaseItemValueCreditCardUnknownError
 * @param {unknown} error Objeto de Erro a ser verificado
 * @returns {error is BaseItemValueCreditCardUnknownError} Retorna se o objeto é do tipo BaseItemValueCreditCardUnknownError
 */
// https://typescript.tv/errors/#ts1196
export function isBaseItemValueCreditCardUnknownError(error: unknown): error is BaseItemValueCreditCardUnknownError {
  return error instanceof BaseItemValueCreditCardUnknownError;
}
// END BaseItemValueCreditCardUnknownError Declaration