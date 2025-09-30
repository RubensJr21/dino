import * as imt from "@data_functions/installment"
import { db } from "@database/db-instance"

export async function list_all() {
  return await imt.get_all(db)
}