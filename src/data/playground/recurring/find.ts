import * as rec from "@data_functions/recurring";
import { db } from "@database/db-instance";

export async function find_recurring(recurring_id: rec.infer_select["id"]) {
  return await rec.get(db, recurring_id);
}