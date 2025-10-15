import { BankReport, getBankBalances } from "@data/playground/balance/functions/bank";
import { CashReport, getCashBalance } from "@data/playground/balance/functions/cash";
import { db } from "@database/db-instance";

type ReturnReportsType = {
  balance_banks: Array<BankReport>
  balance_cash: CashReport
}

export { type ReturnReportsType as BalanceByOriginReturn };

export async function balance_by_origin(
  month: number,
  year: number,
): Promise<ReturnReportsType> {
  const [balance_banks, balance_cash] = await Promise.all([
    getBankBalances(db, year, month),
    getCashBalance(db, year, month),
  ]);

  return { balance_banks, balance_cash };
}