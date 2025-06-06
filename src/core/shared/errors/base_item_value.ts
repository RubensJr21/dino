import { BaseItemValue } from "@src/core/entities/base_item_value.entity";

export class BaseItemValueNotFoundById extends Error {
  readonly name: string = "BaseItemValueNotFoundById";
  /**
   * @param {BaseItemValue["id"]} base_item_value_id base_item_value_id que gerou erro ao ser buscada
   */
  constructor(base_item_value_id: BaseItemValue["id"]){
    super(`BaseItemValue id: '${base_item_value_id}' not founded!`, {
      cause: `The base_item_value id '${base_item_value_id}' is invalid!`
    })
  }
}

/**
 * Função que retorna se o objeto passado é um BaseItemValueNotFoundById
 * @param {unknown} error Objeto de Erro a ser verificado
 * @returns {error is BaseItemValueNotFoundById} Retorna se o objeto é do tipo BaseItemValueNotFoundById
 */
// https://typescript.tv/errors/#ts1196
export function isBaseItemValueNotFoundById(error: unknown): error is BaseItemValueNotFoundById {
  return error instanceof BaseItemValueNotFoundById;
}

// END BaseItemValueNotFoundById Declaration

export class BaseItemValueUnknownError extends Error {
  readonly name: string = "BaseItemValueUnknownError";
  // eslint-disable-next-line jsdoc/require-jsdoc
  constructor(){
    super(`BaseItemValue not founded!`, {
      cause: `Unknown`
    })
  }
}

/**
 * Função que retorna se o objeto passado é um BaseItemValueUnknownError
 * @param {unknown} error Objeto de Erro a ser verificado
 * @returns {error is BaseItemValueUnknownError} Retorna se o objeto é do tipo BaseItemValueUnknownError
 */
// https://typescript.tv/errors/#ts1196
export function isBaseItemValueUnknownError(error: unknown): error is BaseItemValueUnknownError {
  return error instanceof BaseItemValueUnknownError;
}
// END BaseItemValueUnknownError Declaration