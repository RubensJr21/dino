import { StandardScreenEdit } from "@lib/types";
import { validateBaseTransactionEditData } from "@lib/validations/updates/base_transaction";

export function validateStandardTransactionEditData(data: StandardScreenEdit): [hasError: boolean, errors: Array<string>]{
  const {
    scheduledAt,
    ...baseTransactionData
  } = data

  const [baseHasError, errors] = validateBaseTransactionEditData(baseTransactionData)
  return [baseHasError, errors]
}