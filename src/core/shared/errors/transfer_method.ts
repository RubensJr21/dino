import { TransferMethod } from "@src/core/entities/transfer_method.entity";

export class TransferMethodNotFoundById extends Error {
  readonly name: string = "TransferMethodNotFoundById";
  /**
   * @param {TransferMethod["id"]} tmt_id The ID of the transfer method type that was not found
   */
  constructor(tmt_id: TransferMethod["id"]){
    super(`Transfer Method Type '${tmt_id}' not founded!`, {
      cause: `The transfer method type id '${tmt_id}' is invalid!`
    })
  }
}

/**
 * @param {unknown} error Objeto de Erro a ser verificado
 * @returns {error is TransferMethodNotFoundById} Retorna se o objeto é do tipo TransferMethodNotFoundById
 */
// https://typescript.tv/errors/#ts1196
export function isTransferMethodNotFoundById(error: unknown): error is TransferMethodNotFoundById {
  return error instanceof TransferMethodNotFoundById;
}

// END TransferMethodNotFoundById Declaration

export class TransferMethodNotFoundByNickname extends Error {
  readonly name: string = "TransferMethodNotFoundByNickname";
  /**
   * @param {TransferMethod["name"]} transfer_method_nickname transfer_method_nickname que gerou erro ao ser buscada
   */
  constructor(transfer_method_nickname: TransferMethod["nickname"]){
    super(`TransferMethod nickname: '${transfer_method_nickname}' not founded!`, {
      cause: `The nickname transfer_method '${transfer_method_nickname}' is invalid!`
    })
  }
}

/**
 * Função que retorna se o objeto passado é um TransferMethodNotFoundByNickname
 * @param {unknown} error Objeto de Erro a ser verificado
 * @returns {error is TransferMethodNotFoundByNickname} Retorna se o objeto é do tipo TransferMethodNotFoundByNickname
 */
// https://typescript.tv/errors/#ts1196
export function isTransferMethodNotFoundByNickname(error: unknown): error is TransferMethodNotFoundByNickname {
  return error instanceof TransferMethodNotFoundByNickname;
}

// END TransferMethodNotFoundByNickname Declaration