import { Installment } from "@src/core/entities/installment.entity";

// https://typescript.tv/errors/#ts1196
export class InstallmentNotFoundById extends Error {
  readonly name: string = "InstallmentNotFoundById";
  /**
   * @param {Installment["id"]} installment_item_value_id installment_item_value_id que gerou erro ao ser buscada
   */
  constructor(installment_item_value_id: Installment["id"]){
    super(`Installment id: '${installment_item_value_id}' not founded!`, {
      cause: `The installment_item_value id '${installment_item_value_id}' is invalid!`
    })
  }
}

/**
 * Função que retorna se o objeto passado é um InstallmentNotFoundById
 * @param {unknown} error Objeto de Erro a ser verificado
 * @returns {error is InstallmentNotFoundById} Retorna se o objeto é do tipo InstallmentNotFoundById
 */
// https://typescript.tv/errors/#ts1196
export function isInstallmentNotFoundById(error: unknown): error is InstallmentNotFoundById {
  return error instanceof InstallmentNotFoundById;
}

export class InstallmentUnknownError extends Error {
  readonly name: string = "InstallmentUnknownError";
  // eslint-disable-next-line jsdoc/require-jsdoc
  constructor(){
    super(`Installment not founded!`, {
      cause: `Unknown`
    })
  }
}

/**
 * Função que retorna se o objeto passado é um InstallmentUnknownError
 * @param {unknown} error Objeto de Erro a ser verificado
 * @returns {error is InstallmentUnknownError} Retorna se o objeto é do tipo InstallmentUnknownError
 */
// https://typescript.tv/errors/#ts1196
export function isInstallmentUnknownError(error: unknown): error is InstallmentUnknownError {
  return error instanceof InstallmentUnknownError;
}
// END InstallmentUnknownError Declaration