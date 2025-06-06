import { RecurringItemValue } from "@src/core/entities/recurring_item_value.entity";

// https://typescript.tv/errors/#ts1196
export class RecurringItemValueNotFoundById extends Error {
  readonly name: string = "RecurringItemValueNotFoundById";
  /**
   * @param {RecurringItemValue["id"]} recurring_item_value_id recurring_item_value_id que gerou erro ao ser buscada
   */
  constructor(recurring_item_value_id: RecurringItemValue["id"]){
    super(`RecurringItemValue id: '${recurring_item_value_id}' not founded!`, {
      cause: `The recurring_item_value id '${recurring_item_value_id}' is invalid!`
    })
  }
}

/**
 * Função que retorna se o objeto passado é um RecurringItemValueNotFoundById
 * @param {unknown} error Objeto de Erro a ser verificado
 * @returns {error is RecurringItemValueNotFoundById} Retorna se o objeto é do tipo RecurringItemValueNotFoundById
 */
// https://typescript.tv/errors/#ts1196
export function isRecurringItemValueNotFoundById(error: unknown): error is RecurringItemValueNotFoundById {
  return error instanceof RecurringItemValueNotFoundById;
}

// END RecurringItemValueNotFoundById Declaration

export class RecurringItemValueUnknownError extends Error {
  readonly name: string = "RecurringItemValueUnknownError";
  // eslint-disable-next-line jsdoc/require-jsdoc
  constructor(){
    super(`RecurringItemValue not founded!`, {
      cause: `Unknown`
    })
  }
}

/**
 * Função que retorna se o objeto passado é um RecurringItemValueUnknownError
 * @param {unknown} error Objeto de Erro a ser verificado
 * @returns {error is RecurringItemValueUnknownError} Retorna se o objeto é do tipo RecurringItemValueUnknownError
 */
// https://typescript.tv/errors/#ts1196
export function isRecurringItemValueUnknownError(error: unknown): error is RecurringItemValueUnknownError {
  return error instanceof RecurringItemValueUnknownError;
}
// END RecurringItemValueUnknownError Declaration