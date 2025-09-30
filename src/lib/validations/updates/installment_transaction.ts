import { InstallmentScreenUpdate } from "@lib/types";
import { validateBaseTransactionUpdateData } from "@lib/validations/updates/base_transaction";

export function validateInstallmentTransactionUpdateData(data: InstallmentScreenUpdate): [hasError: boolean, errors: Array<string>]{
  const [baseHasError, errors] = validateBaseTransactionUpdateData(data)
  return [baseHasError, errors]
}