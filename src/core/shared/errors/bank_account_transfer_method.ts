import { BankAccountTransferMethod } from "@src/core/entities/bank_account_transfer_method.entity";

export class BankAccountTransferMethodNotFoundById extends Error {
  readonly name: string = "BankAccountTransferMethodNotFoundById";
  /**
   * @param {BankAccountTransferMethod["id"]} bank_account_id bank_account_id que gerou erro ao ser buscada
   */
  constructor(bank_account_id: BankAccountTransferMethod["id"]){
    super(`BankAccountTransferMethod id: '${bank_account_id}' not founded!`, {
      cause: `The bank_account id '${bank_account_id}' is invalid!`
    })
  }
}

/**
 * Função que retorna se o objeto passado é um BankAccountTransferMethodNotFoundById
 * @param {unknown} error Objeto de Erro a ser verificado
 * @returns {error is BankAccountTransferMethodNotFoundById} Retorna se o objeto é do tipo BankAccountTransferMethodNotFoundById
 */
// https://typescript.tv/errors/#ts1196
export function isBankAccountTransferMethodNotFoundById(error: unknown): error is BankAccountTransferMethodNotFoundById {
  return error instanceof BankAccountTransferMethodNotFoundById;
}

// END BankAccountTransferMethodNotFoundById Declaration

export class BankAccountTransferMethodUnknownError extends Error {
  readonly name: string = "BankAccountTransferMethodUnknownError";
  // eslint-disable-next-line jsdoc/require-jsdoc
  constructor(){
    super(`BankAccountTransferMethod not founded!`, {
      cause: `Unknown`
    })
  }
}

/**
 * Função que retorna se o objeto passado é um BankAccountTransferMethodUnknownError
 * @param {unknown} error Objeto de Erro a ser verificado
 * @returns {error is BankAccountTransferMethodUnknownError} Retorna se o objeto é do tipo BankAccountTransferMethodUnknownError
 */
// https://typescript.tv/errors/#ts1196
export function isBankAccountTransferMethodUnknownError(error: unknown): error is BankAccountTransferMethodUnknownError {
  return error instanceof BankAccountTransferMethodUnknownError;
}
// END BankAccountTransferMethodUnknownError Declaration