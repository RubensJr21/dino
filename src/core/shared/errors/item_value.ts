import { ItemValue } from "@src/core/entities/item_value.entity";

export class ItemValueNotFoundById extends Error {
  readonly name: string = "ItemValueNotFoundById";
  /**
   * @param {ItemValue["id"]} base_item_value_id base_item_value_id que gerou erro ao ser buscada
   */
  constructor(base_item_value_id: ItemValue["id"]){
    super(`ItemValue id: '${base_item_value_id}' not founded!`, {
      cause: `The base_item_value id '${base_item_value_id}' is invalid!`
    })
  }
}

/**
 * Função que retorna se o objeto passado é um ItemValueNotFoundById
 * @param {unknown} error Objeto de Erro a ser verificado
 * @returns {error is ItemValueNotFoundById} Retorna se o objeto é do tipo ItemValueNotFoundById
 */
// https://typescript.tv/errors/#ts1196
export function isItemValueNotFoundById(error: unknown): error is ItemValueNotFoundById {
  return error instanceof ItemValueNotFoundById;
}

// END ItemValueNotFoundById Declaration

export class ItemValueUnknownError extends Error {
  readonly name: string = "ItemValueUnknownError";
  // eslint-disable-next-line jsdoc/require-jsdoc
  constructor(){
    super(`ItemValue not founded!`, {
      cause: `Unknown`
    })
  }
}

/**
 * Função que retorna se o objeto passado é um ItemValueUnknownError
 * @param {unknown} error Objeto de Erro a ser verificado
 * @returns {error is ItemValueUnknownError} Retorna se o objeto é do tipo ItemValueUnknownError
 */
// https://typescript.tv/errors/#ts1196
export function isItemValueUnknownError(error: unknown): error is ItemValueUnknownError {
  return error instanceof ItemValueUnknownError;
}
// END ItemValueUnknownError Declaration