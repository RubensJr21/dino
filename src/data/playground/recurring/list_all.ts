import * as rec from "@data_functions/recurring"
import { db } from "@database/db-instance"

export async function list_all() {
  return await rec.get_all(db)
}