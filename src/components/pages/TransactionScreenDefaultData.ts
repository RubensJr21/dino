import { INITIAL_TRANSACTION_INSTRUMENT } from "@components/ui/SelectTransactionInstrumentOfTransferMethod/SelectTransactionInstrumentButton"
import { TransactionScreenBaseInsert } from "@lib/types"

export const INITIAL_DESCRIPTION = ""
export const INITIAL_AMOUNT_VALUE = "0,00"
export const INITIAL_CATEGORY = {
  id: -1,
  code: ""
}

export const initialDataBase = {
  description: INITIAL_DESCRIPTION,
  amountValue: INITIAL_AMOUNT_VALUE,
  category: INITIAL_CATEGORY,
  transactionInstrument: INITIAL_TRANSACTION_INSTRUMENT
} satisfies TransactionScreenBaseInsert