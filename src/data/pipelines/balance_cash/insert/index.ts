import { getRealAmountValue } from "@data/playground/utils";
import * as bc from "@data_functions/balance_cash";
import { type DatabaseType } from "@database/db-instance";
import {
  balanceBank,
  balanceCash,
  baseTransactionType,
  itemValue
} from "@database/schema";

type monthType = typeof balanceBank.$inferSelect.month &
  typeof balanceCash.$inferSelect.month;
type yearType = typeof balanceBank.$inferSelect.year &
  typeof balanceCash.$inferSelect.year;

type BaseData = {
  month: monthType;
  year: yearType;
  amount: typeof itemValue.$inferSelect.amount;
  cashflow_type: typeof baseTransactionType.$inferSelect.cashflow_type;
};

type CashData = BaseData;

export async function balance_cash_insert_pipeline(
  db: DatabaseType,
  data: CashData
) {
  const { month, year, amount } = data;

  const realAmount = getRealAmountValue(data.cashflow_type, amount);

  const balance_cash = await bc.get_balance(db, {
    month,
    year,
  });

  if (balance_cash === undefined) {
    await bc.create_balance(db, {
      month,
      year,
      amount: realAmount,
    });
  } else {
    // inserir no balanço de balance_cash
    await bc.add_amount(db, {
      id: balance_cash.id,
      updated_planned_amount: balance_cash.planned_amount + realAmount,
    });
  }
}