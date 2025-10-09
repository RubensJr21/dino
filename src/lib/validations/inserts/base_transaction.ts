import { INITIAL_TRANSACTION_INSTRUMENT } from "@components/ui/SelectTransactionInstrumentOfTransferMethod/SelectTransactionInstrumentButton";
import { TransactionScreenBaseInsert } from "@lib/types";
import { INITIAL_CATEGORY } from "@pages/TransactionScreenDefaultData";

export function validateBaseTransactionInsertData(data: TransactionScreenBaseInsert): [hasError: boolean, errors: Array<string>] {
  const errors = new Array<string>()
  let hasError = false

  if (data.description.length === 0) {
    hasError = true;
    errors.push("> Descrição não pode ser vazia!")
  }

  const amountAsNumber = Number(data.amountValue.replaceAll(/\D/g, ""))
  if (Number.isNaN(amountAsNumber) || amountAsNumber <= 0) {
    hasError = true;
    errors.push("> Valor inválido! (Precisa ser maior que zero)")
  }

  if(data.category.id === INITIAL_CATEGORY.id){
    hasError = true;
    errors.push("> É necessário escolher uma categoria!")
  }

  if(data.transactionInstrument.id === INITIAL_TRANSACTION_INSTRUMENT.id) {
    hasError = true;
    errors.push("> É necessário escolher um instrumento de transferência!")
  }

  return [hasError, errors]
}