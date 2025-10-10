import * as imt from "@data_functions/installment"
import { db } from "@database/db-instance"

export async function list_all_item_value_installments(installment_id: number) {
  return await imt.get_all_item_values(db, installment_id)
}