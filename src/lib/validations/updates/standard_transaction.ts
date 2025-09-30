import { StandardScreenUpdate } from "@lib/types";
import { validateBaseTransactionUpdateData } from "@lib/validations/updates/base_transaction";

export function validateStandardTransactionUpdateData(data: StandardScreenUpdate): [hasError: boolean, errors: Array<string>] {
  const {
    scheduledAt,
    amountValue,
    ...baseTransactionData
  } = data

  const [baseHasError, errors] = validateBaseTransactionUpdateData(baseTransactionData)

  let hasError = baseHasError

  if(amountValue !== undefined){
    const amountAsNumber = Number(amountValue.replace(/\D/, ""))
    if (Number.isNaN(amountAsNumber) || amountAsNumber <= 0) {
      hasError = true;
      errors.push("> Valor inválido! (Precisa ser maior que zero)")
    }
  }

  return [baseHasError, errors]
}