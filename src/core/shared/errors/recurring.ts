import { Recurring } from "@src/core/entities/recurring.entity";

// https://typescript.tv/errors/#ts1196
export class RecurringNotFoundById extends Error {
  readonly name: string = "RecurringNotFoundById";
  /**
   * @param {Recurring["id"]} recurring_item_value_id recurring_item_value_id que gerou erro ao ser buscada
   */
  constructor(recurring_item_value_id: Recurring["id"]){
    super(`Recurring id: '${recurring_item_value_id}' not founded!`, {
      cause: `The recurring_item_value id '${recurring_item_value_id}' is invalid!`
    })
  }
}

/**
 * Função que retorna se o objeto passado é um RecurringNotFoundById
 * @param {unknown} error Objeto de Erro a ser verificado
 * @returns {error is RecurringNotFoundById} Retorna se o objeto é do tipo RecurringNotFoundById
 */
// https://typescript.tv/errors/#ts1196
export function isRecurringNotFoundById(error: unknown): error is RecurringNotFoundById {
  return error instanceof RecurringNotFoundById;
}

// END RecurringNotFoundById Declaration

export class RecurringUnknownError extends Error {
  readonly name: string = "RecurringUnknownError";
  // eslint-disable-next-line jsdoc/require-jsdoc
  constructor(){
    super(`Recurring not founded!`, {
      cause: `Unknown`
    })
  }
}

/**
 * Função que retorna se o objeto passado é um RecurringUnknownError
 * @param {unknown} error Objeto de Erro a ser verificado
 * @returns {error is RecurringUnknownError} Retorna se o objeto é do tipo RecurringUnknownError
 */
// https://typescript.tv/errors/#ts1196
export function isRecurringUnknownError(error: unknown): error is RecurringUnknownError {
  return error instanceof RecurringUnknownError;
}
// END RecurringUnknownError Declaration