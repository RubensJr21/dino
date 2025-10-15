import * as std from "@data_functions/standard"
import { db } from "@database/db-instance"

export async function list_all_standards(cashflow_type: Cashflow_Type) {
  return await std.get_all(db, cashflow_type)
}