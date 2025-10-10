import * as rec from "@data_functions/recurring"
import { db } from "@database/db-instance"

export async function list_all_item_value_recurrings(recurring_id: number) {
  return await rec.get_all_item_values(db, recurring_id)
}