import { InstallmentScreenEdit } from "@lib/types";
import { validateBaseTransactionEditData } from "@lib/validations/updates/base_transaction";

export function validateInstallmentTransactionEditData(data: InstallmentScreenEdit): [hasError: boolean, errors: Array<string>]{
  const [baseHasError, errors] = validateBaseTransactionEditData(data)

  return [baseHasError, errors]
}