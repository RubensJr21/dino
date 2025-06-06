import { TransferMethodType } from "@src/core/entities/transfer_method_type.entity";

export class TransferMethodTypeNotFoundById extends Error {
  readonly name: string = "TransferMethodTypeNotFoundById";
  /**
   * @param {TransferMethodType["id"]} tmt_id The ID of the transfer method type that was not found
   */
  constructor(tmt_id: TransferMethodType["id"]){
    super(`Transfer Method Type '${tmt_id}' not founded!`, {
      cause: `The transfer method type id '${tmt_id}' is invalid!`
    })
  }
}

/**
 * @param {unknown} error Objeto de Erro a ser verificado
 * @returns {error is TransferMethodTypeNotFoundById} Retorna se o objeto é do tipo TransferMethodTypeNotFoundById
 */
// https://typescript.tv/errors/#ts1196
export function isTransferMethodTypeNotFoundById(error: unknown): error is TransferMethodTypeNotFoundById {
  return error instanceof TransferMethodTypeNotFoundById;
}

// END TransferMethodTypeNotFoundById Declaration

export class TransferMethodTypeNotFoundByName extends Error {
  readonly name: string = "TransferMethodTypeNotFoundByName";
  /**
   * @param {TransferMethodType["name"]} bank_account_name bank_account_name que gerou erro ao ser buscada
   */
  constructor(bank_account_name: TransferMethodType["name"]){
    super(`TransferMethodType name: '${bank_account_name}' not founded!`, {
      cause: `The name bank_account '${bank_account_name}' is invalid!`
    })
  }
}

/**
 * Função que retorna se o objeto passado é um TransferMethodTypeNotFoundByName
 * @param {unknown} error Objeto de Erro a ser verificado
 * @returns {error is TransferMethodTypeNotFoundByName} Retorna se o objeto é do tipo TransferMethodTypeNotFoundByName
 */
// https://typescript.tv/errors/#ts1196
export function isTransferMethodTypeNotFoundByName(error: unknown): error is TransferMethodTypeNotFoundByName {
  return error instanceof TransferMethodTypeNotFoundByName;
}

// END TransferMethodTypeNotFoundByName Declaration