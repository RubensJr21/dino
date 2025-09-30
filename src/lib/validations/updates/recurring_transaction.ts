import { RecurringScreenEdit } from "@lib/types";
import { validateBaseTransactionEditData } from "@lib/validations/updates/base_transaction";

export function validateRecurringTransactionEditData(data: RecurringScreenEdit): [hasError: boolean, errors: Array<string>] {
  const [baseHasError, errors] = validateBaseTransactionEditData(data)

  return [baseHasError, errors]
}