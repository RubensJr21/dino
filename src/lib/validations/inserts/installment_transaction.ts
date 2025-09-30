import { InstallmentScreenInsert } from "@lib/types";
import { validateBaseTransactionInsertData } from "@lib/validations/inserts/base_transaction";

export function validateInstallmentTransactionInsertData(data: InstallmentScreenInsert): [hasError: boolean, errors: Array<string>]{
  const {
    installments,
    startDate,
    ...baseTransactionData
  } = data

  const [baseHasError, errors] = validateBaseTransactionInsertData(baseTransactionData)
  let hasError = baseHasError

  const installmentsAsNumber = Number(installments)
  if (Number.isNaN(installmentsAsNumber) || installmentsAsNumber < 2) {
    hasError = true;
    errors.push("> Valor inválido! (Precisa ser >= 2)")
  }

  return [hasError, errors]
}