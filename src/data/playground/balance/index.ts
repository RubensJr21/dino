import { db } from "@database/db-instance";
import { bankAccount } from "@database/schema";
import { balance_by_origin } from "./balance_by_origin";
import * as bb_fns from "./functions/bank";
import * as bc_fns from "./functions/cash";

export { BalanceByOriginReturn } from "./balance_by_origin";
export async function get_balance_by_origin(
  month: number, year: number
) {
  return await balance_by_origin(month, year)
}

export async function generate_balance_bank(
  bank_id: typeof bankAccount.$inferSelect.id,
  year: number,
  month: number
) {
  bb_fns.build_balance(db, bank_id, year, month);
}

export async function generate_balance_cash(
  year: number,
  month: number
) {
  bc_fns.build_balance(db, year, month);
}