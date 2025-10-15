import { StandardScreenInsert } from "@lib/types";
import { validateBaseTransactionInsertData } from "@lib/validations/inserts/base_transaction";

export function validateStandardTransactionInsertData(data: StandardScreenInsert): [hasError: boolean, errors: Array<string>]{
  const {
    scheduledAt,
    ...baseTransactionData
  } = data

  const [baseHasError, errors] = validateBaseTransactionInsertData(baseTransactionData)
  return [baseHasError, errors]
}