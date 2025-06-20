import { Installment } from "@src/core/entities/installment.entity";

// https://typescript.tv/errors/#ts1196
export class InstallmentItemValueNotFoundById extends Error {
  readonly name: string = "InstallmentItemValueNotFoundById";
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
 * Função que retorna se o objeto passado é um InstallmentItemValueNotFoundById
 * @param {unknown} error Objeto de Erro a ser verificado
 * @returns {error is InstallmentItemValueNotFoundById} Retorna se o objeto é do tipo InstallmentItemValueNotFoundById
 */
// https://typescript.tv/errors/#ts1196
export function isInstallmentItemValueNotFoundById(error: unknown): error is InstallmentItemValueNotFoundById {
  return error instanceof InstallmentItemValueNotFoundById;
}

export class InstallmentItemValueUnknownError extends Error {
  readonly name: string = "InstallmentItemValueUnknownError";
  // eslint-disable-next-line jsdoc/require-jsdoc
  constructor(){
    super(`Installment not founded!`, {
      cause: `Unknown`
    })
  }
}

/**
 * Função que retorna se o objeto passado é um InstallmentItemValueUnknownError
 * @param {unknown} error Objeto de Erro a ser verificado
 * @returns {error is InstallmentItemValueUnknownError} Retorna se o objeto é do tipo InstallmentItemValueUnknownError
 */
// https://typescript.tv/errors/#ts1196
export function isInstallmentItemValueUnknownError(error: unknown): error is InstallmentItemValueUnknownError {
  return error instanceof InstallmentItemValueUnknownError;
}
// END InstallmentItemValueUnknownError Declaration