import { RecurrenceType } from "@src/core/entities/recurrence_type.entity";

// https://typescript.tv/errors/#ts1196
export class RecurrenceTypeNotFoundById extends Error {
  readonly name: string = "RecurrenceTypeNotFoundById";
  /**
   * @param {RecurrenceType["id"]} recurrence_type_id recurrence_type_id que gerou erro ao ser buscada
   */
  constructor(recurrence_type_id: RecurrenceType["id"]){
    super(`RecurrenceType id: '${recurrence_type_id}' not founded!`, {
      cause: `The recurrence_type id '${recurrence_type_id}' is invalid!`
    })
  }
}

/**
 * Função que retorna se o objeto passado é um RecurrenceTypeNotFoundById
 * @param {unknown} error Objeto de Erro a ser verificado
 * @returns {error is RecurrenceTypeNotFoundById} Retorna se o objeto é do tipo RecurrenceTypeNotFoundById
 */
// https://typescript.tv/errors/#ts1196
export function isRecurrenceTypeNotFoundById(error: unknown): error is RecurrenceTypeNotFoundById {
  return error instanceof RecurrenceTypeNotFoundById;
}

export class RecurrenceTypeNotFoundByType extends Error {
  readonly name: string = "RecurrenceTypeNotFoundByType";
  /**
   * @param {RecurrenceType["type"]} bank_account_type bank_account_type que gerou erro ao ser buscada
   */
  constructor(bank_account_type: RecurrenceType["type"]){
    super(`RecurrenceType type: '${bank_account_type}' not founded!`, {
      cause: `The type bank_account '${bank_account_type}' is invalid!`
    })
  }
}

/**
 * Função que retorna se o objeto passado é um RecurrenceTypeNotFoundByType
 * @param {unknown} error Objeto de Erro a ser verificado
 * @returns {error is RecurrenceTypeNotFoundByType} Retorna se o objeto é do tipo RecurrenceTypeNotFoundByType
 */
// https://typescript.tv/errors/#ts1196
export function isRecurrenceTypeNotFoundByType(error: unknown): error is RecurrenceTypeNotFoundByType {
  return error instanceof RecurrenceTypeNotFoundByType;
}

// END RecurrenceTypeNotFoundByType Declaration

export class RecurrenceTypeTypeIsAlreadyInUse extends Error {
  readonly name: string = "RecurrenceTypeTypeIsAlreadyInUse";
  /**
   * @param {RecurrenceType["type"]} bank_account_type bank_account_type que gerou erro ao ser buscada
   */
 constructor(bank_account_type: RecurrenceType["type"]){
   super(`The RecurrenceType type: '${bank_account_type}' already in use!`)
  }
}

/**
 * Função que retorna se o objeto passado é um RecurrenceTypeTypeIsAlreadyInUse
 * @param {unknown} error Objeto de Erro a ser verificado
 * @returns {error is RecurrenceTypeTypeIsAlreadyInUse} Retorna se o objeto é do tipo RecurrenceTypeTypeIsAlreadyInUse
 */
// https://typescript.tv/errors/#ts1196
export function isRecurrenceTypeTypeIsAlreadyInUse(error: unknown): error is RecurrenceTypeTypeIsAlreadyInUse {
  return error instanceof RecurrenceTypeTypeIsAlreadyInUse;
}

// END RecurrenceTypeTypeIsAlreadyInUse Declaration

export class RecurrenceTypeUnknownError extends Error {
  readonly name: string = "RecurrenceTypeUnknownError";
  // eslint-disable-next-line jsdoc/require-jsdoc
  constructor(){
    super(`RecurrenceType not founded!`, {
      cause: `Unknown`
    })
  }
}

/**
 * Função que retorna se o objeto passado é um RecurrenceTypeUnknownError
 * @param {unknown} error Objeto de Erro a ser verificado
 * @returns {error is RecurrenceTypeUnknownError} Retorna se o objeto é do tipo RecurrenceTypeUnknownError
 */
// https://typescript.tv/errors/#ts1196
export function isRecurrenceTypeUnknownError(error: unknown): error is RecurrenceTypeUnknownError {
  return error instanceof RecurrenceTypeUnknownError;
}
// END RecurrenceTypeUnknownError Declaration