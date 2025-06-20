import { Standard } from "@src/core/entities/standard.entity";

// https://typescript.tv/errors/#ts1196
export class StandardNotFoundById extends Error {
  readonly name: string = "StandardNotFoundById";
  /**
   * @param {Standard["id"]} item_value_id item_value_id que gerou erro ao ser buscada
   */
  constructor(item_value_id: Standard["id"]){
    super(`Standard id: '${item_value_id}' not founded!`, {
      cause: `The item_value id '${item_value_id}' is invalid!`
    })
  }
}

/**
 * Função que retorna se o objeto passado é um StandardNotFoundById
 * @param {unknown} error Objeto de Erro a ser verificado
 * @returns {error is StandardNotFoundById} Retorna se o objeto é do tipo StandardNotFoundById
 */
// https://typescript.tv/errors/#ts1196
export function isStandardNotFoundById(error: unknown): error is StandardNotFoundById {
  return error instanceof StandardNotFoundById;
}

// END StandardNotFoundById Declaration

// https://typescript.tv/errors/#ts1196
export class StandardNotFoundOnDeleting extends Error {
  readonly name: string = "StandardNotFoundOnDeleting";
  /**
   * @param {Standard["id"]} item_value_id item_value_id que gerou erro ao ser buscada
   */
  constructor(item_value_id: Standard["id"]){
    super(`Standard id: '${item_value_id}' not founded!`, {
      cause: `The item_value id '${item_value_id}' is invalid!`
    })
  }
}

/**
 * Função que retorna se o objeto passado é um StandardNotFoundOnDeleting
 * @param {unknown} error Objeto de Erro a ser verificado
 * @returns {error is StandardNotFoundOnDeleting} Retorna se o objeto é do tipo StandardNotFoundOnDeleting
 */
// https://typescript.tv/errors/#ts1196
export function isStandardNotFoundOnDeleting(error: unknown): error is StandardNotFoundOnDeleting {
  return error instanceof StandardNotFoundOnDeleting;
}

// END StandardNotFoundOnDeleting Declaration

export class StandardUnknownError extends Error {
  readonly name: string = "StandardUnknownError";
  // eslint-disable-next-line jsdoc/require-jsdoc
  constructor(){
    super(`Standard not founded!`, {
      cause: `Unknown`
    })
  }
}

/**
 * Função que retorna se o objeto passado é um StandardUnknownError
 * @param {unknown} error Objeto de Erro a ser verificado
 * @returns {error is StandardUnknownError} Retorna se o objeto é do tipo StandardUnknownError
 */
// https://typescript.tv/errors/#ts1196
export function isStandardUnknownError(error: unknown): error is StandardUnknownError {
  return error instanceof StandardUnknownError;
}
// END StandardUnknownError Declaration