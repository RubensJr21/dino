import { getRealAmountValue } from "@data/playground/utils"
import * as bc from "@data_functions/balance_cash"
import * as btt from "@data_functions/base_transaction_type"
import { db } from "@database/db-instance"
import { balanceCash } from "@database/schema"
import { eq } from "drizzle-orm"

interface UpdateAmountParams {
  cashflow_type: btt.infer_select["cashflow_type"]
  date: Date;
  new_amount: number;
  old_amount: number;
  was_processed: boolean;
}

export async function update_amount({
  date,
  old_amount,
  new_amount,
  cashflow_type,
  was_processed
}: UpdateAmountParams) {
  const balance_cash_out = await bc.get_balance(db, {
    month: date.getMonth(),
    year: date.getFullYear()
  })

  if (balance_cash_out === undefined) {
    throw new Error("Balanço não encontrado! (Mudando apenas o valor)")
  }

  const realAmountValueForRemove = getRealAmountValue(cashflow_type, old_amount, true)
  const realAmountValueForInsert = getRealAmountValue(cashflow_type, new_amount, false)

  const planned_amount = 
    balance_cash_out.planned_amount + realAmountValueForRemove + realAmountValueForInsert
  const executed_amount = was_processed
    ? balance_cash_out.executed_amount + realAmountValueForRemove + realAmountValueForInsert
    : undefined

  await db
    .update(balanceCash)
    .set({ planned_amount, executed_amount })
    .where(eq(balanceCash.id, balance_cash_out.id))
}