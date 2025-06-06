import { ItemValue } from "@src/core/entities/item_value.entity";

// https://typescript.tv/errors/#ts1196
export class ItemValueNotFoundById extends Error {
  readonly name: string = "ItemValueNotFoundById";
  /**
   * @param {ItemValue["id"]} item_value_id item_value_id que gerou erro ao ser buscada
   */
  constructor(item_value_id: ItemValue["id"]){
    super(`ItemValue id: '${item_value_id}' not founded!`, {
      cause: `The item_value id '${item_value_id}' is invalid!`
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

// https://typescript.tv/errors/#ts1196
export class ItemValueNotFoundOnDeleting extends Error {
  readonly name: string = "ItemValueNotFoundOnDeleting";
  /**
   * @param {ItemValue["id"]} item_value_id item_value_id que gerou erro ao ser buscada
   */
  constructor(item_value_id: ItemValue["id"]){
    super(`ItemValue id: '${item_value_id}' not founded!`, {
      cause: `The item_value id '${item_value_id}' is invalid!`
    })
  }
}

/**
 * Função que retorna se o objeto passado é um ItemValueNotFoundOnDeleting
 * @param {unknown} error Objeto de Erro a ser verificado
 * @returns {error is ItemValueNotFoundOnDeleting} Retorna se o objeto é do tipo ItemValueNotFoundOnDeleting
 */
// https://typescript.tv/errors/#ts1196
export function isItemValueNotFoundOnDeleting(error: unknown): error is ItemValueNotFoundOnDeleting {
  return error instanceof ItemValueNotFoundOnDeleting;
}

// END ItemValueNotFoundOnDeleting Declaration

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