import { getRealAmountValue } from "@data/playground/utils"
import * as bc from "@data_functions/balance_cash"
import * as btt from "@data_functions/base_transaction_type"
import { db } from "@database/db-instance"
import { balanceCash } from "@database/schema"
import { eq } from "drizzle-orm"

interface MoveDateParams {
  cashflow_type: btt.infer_select["cashflow_type"]
  new_date: Date;
  old_date: Date;
  amount: number;
  was_processed: boolean;
}

export async function move_date({
  new_date, old_date,
  amount,
  cashflow_type,
  was_processed
}: MoveDateParams) {
  const balance_cash_out = await bc.get_balance(db, {
    month: old_date.getMonth(),
    year: old_date.getFullYear()
  })

  if (balance_cash_out === undefined) {
    throw new Error("Balanço de origem não encontrado!")
  }

  
  const realAmountValueForRemove = getRealAmountValue(cashflow_type, amount, true)

  {
    const planned_amount = balance_cash_out.planned_amount + realAmountValueForRemove
    const executed_amount = was_processed ? balance_cash_out.executed_amount + realAmountValueForRemove : undefined

    await db
      .update(balanceCash)
      .set({ planned_amount, executed_amount })
      .where(eq(balanceCash.id, balance_cash_out.id))

  }

  const balance_cash_in = await bc.get_balance(db, {
    month: new_date.getMonth(),
    year: new_date.getFullYear()
  })

  const realAmountValueForInsert = getRealAmountValue(cashflow_type, amount, false)

  if (balance_cash_in === undefined) {
    await bc.create_balance(db, {
      amount: realAmountValueForInsert,
      month: new_date.getMonth(),
      year: new_date.getFullYear()
    })
    return;
  } else {
  
    const planned_amount = balance_cash_in.planned_amount + realAmountValueForInsert
    const executed_amount = was_processed ? balance_cash_in.executed_amount + realAmountValueForInsert : undefined
  
    await db
      .update(balanceCash)
      .set({ planned_amount, executed_amount })
      .where(eq(balanceCash.id, balance_cash_in.id))

  }
}