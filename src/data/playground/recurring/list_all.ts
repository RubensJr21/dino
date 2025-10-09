import * as rec from "@data_functions/recurring"
import { db } from "@database/db-instance"

export async function list_all_recurrings(cashflow_type: Cashflow_Type) {
  return await rec.get_all(db, cashflow_type)
}