import { TransactionScreenBaseEdit } from "@lib/types";
import { INITIAL_CATEGORY } from "@pages/TransactionScreenDefaultData";

export function validateBaseTransactionEditData(data: TransactionScreenBaseEdit): [hasError: boolean, errors: Array<string>] {
  const errors = new Array<string>()
  let hasError = false

  if (data.description?.length === 0) {
    hasError = true;
    errors.push("> Descrição não pode ser vazia!")
  }

  if(data.category?.id === INITIAL_CATEGORY.id){
    hasError = true;
    errors.push("> É necessário escolher uma categoria!")
  }

  return [hasError, errors]
}