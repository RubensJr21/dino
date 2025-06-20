import { ItemValue_CreditCard } from "@src/core/entities/base_item_value-credit_card.entity";
import { ItemValue } from "@src/core/entities/item_value.entity";

export class ItemValueCreditCardNotFoundById extends Error {
  readonly name: string = "ItemValueCreditCardNotFoundById";
  /**
   * @param {ItemValue_CreditCard["id"]} bank_account_id bank_account_id que gerou erro ao ser buscada
   */
  constructor(bank_account_id: ItemValue_CreditCard<ItemValue>["id"]){
    super(`ItemValue_CreditCard id: '${bank_account_id}' not founded!`, {
      cause: `The bank_account id '${bank_account_id}' is invalid!`
    })
  }
}

/**
 * Função que retorna se o objeto passado é um ItemValueCreditCardNotFoundById
 * @param {unknown} error Objeto de Erro a ser verificado
 * @returns {error is ItemValueCreditCardNotFoundById} Retorna se o objeto é do tipo ItemValueCreditCardNotFoundById
 */
// https://typescript.tv/errors/#ts1196
export function isItemValueCreditCardNotFoundById(error: unknown): error is ItemValueCreditCardNotFoundById {
  return error instanceof ItemValueCreditCardNotFoundById;
}

// END ItemValueCreditCardNotFoundById Declaration

export class ItemValueCreditCardUnknownError extends Error {
  readonly name: string = "ItemValueCreditCardUnknownError";
  // eslint-disable-next-line jsdoc/require-jsdoc
  constructor(){
    super(`ItemValue_CreditCard not founded!`, {
      cause: `Unknown`
    })
  }
}

/**
 * Função que retorna se o objeto passado é um ItemValueCreditCardUnknownError
 * @param {unknown} error Objeto de Erro a ser verificado
 * @returns {error is ItemValueCreditCardUnknownError} Retorna se o objeto é do tipo ItemValueCreditCardUnknownError
 */
// https://typescript.tv/errors/#ts1196
export function isItemValueCreditCardUnknownError(error: unknown): error is ItemValueCreditCardUnknownError {
  return error instanceof ItemValueCreditCardUnknownError;
}
// END ItemValueCreditCardUnknownError Declaration