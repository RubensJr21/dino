import { db } from "@database/db-instance";
import { balance_by_category } from "./balance_by_category";
import { balance_by_origin } from "./balance_by_origin";

export { BalanceByOriginReturn } from "./balance_by_origin";
export async function get_balance_by_origin(
  month: number, year: number
) {
  return await balance_by_origin(db, month, year)
}

export { BalanceByCategoryReturn } from "./balance_by_category";
export async function get_balance_by_category(
  month: number, year: number
) {
  return await balance_by_category(db, month, year)
}