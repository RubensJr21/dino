import * as rec from "@data_functions/recurring";
import { db } from "@database/db-instance";

export async function enable_recurring(recurring_id: rec.infer_select["id"]) {
  await rec.enable(db, {
    id: recurring_id,
    start_date: new Date(),
  })
}