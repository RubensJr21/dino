import { RecurringScreenUpdate } from "@lib/types";
import { validateBaseTransactionUpdateData } from "@lib/validations/updates/base_transaction";

export function validateRecurringTransactionUpdateData(data: RecurringScreenUpdate): [hasError: boolean, errors: Array<string>] {
  const [baseHasError, errors] = validateBaseTransactionUpdateData(data)

  return [baseHasError, errors]
}