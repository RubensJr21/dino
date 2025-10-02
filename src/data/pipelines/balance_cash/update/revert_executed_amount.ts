import { getRealAmountValue } from "@data/playground/utils";
import * as bc from "@data_functions/balance_cash";
import * as btt from "@data_functions/base_transaction_type";
import { db } from "@database/db-instance";

interface RevertExecutedAmountParams {
  cashflow_type: btt.infer_select["cashflow_type"];
  date: Date;
  amount: number;
}

export async function revert_executed_amount({
  cashflow_type,
  amount,
  date
}: RevertExecutedAmountParams) {
  const balance_cash = await bc.get_balance(db, {
    month: date.getMonth(),
    year: date.getFullYear()
  })

  if (balance_cash === undefined) {
    throw new Error("Nenhum balanço bancário nesse período foi encontrado.");
  }

  const realAmount = getRealAmountValue(cashflow_type, amount, true);
  const updated_executed_amount = balance_cash.executed_amount + realAmount;
  
  await bc.apply_executed_amount(db, {
    id: balance_cash.id,
    updated_executed_amount
  })
}