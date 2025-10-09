import * as imt from "@data_functions/installment"
import { db } from "@database/db-instance"

export async function list_all_installments(cashflow_type: Cashflow_Type) {
  return await imt.get_all(db, cashflow_type)
}