import { INITIAL_RECURRENCE_TYPE } from "@components/ui/SelectRecurrenceButton";
import { RecurringScreenInsert } from "@lib/types";
import { validateBaseTransactionInsertData } from "@lib/validations/inserts/base_transaction";

export function validateRecurringTransactionInsertData(data: RecurringScreenInsert): [hasError: boolean, errors: Array<string>]{
  const {
    startDate,
    recurrenceType,
    endDate,
    ...baseTransactionData
  } = data

  const [baseHasError, errors] = validateBaseTransactionInsertData(baseTransactionData)
  let hasError = baseHasError

  if (!(startDate instanceof Date)) {
    hasError = true;
    errors.push("> Data de início inválida!")
  }

  if(recurrenceType.id === INITIAL_RECURRENCE_TYPE.id){
    hasError = true;
    errors.push("> É necessário informar um método de recorrência!")
  }

  if(endDate !== null){
    hasError = true;
    errors.push("Valor inválido para endDate!")
  }

  return [hasError, errors]
}