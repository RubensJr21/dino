import * as rt from "@data_functions/recurrence_type";
import { db } from "@database/db-instance";

export async function find_all() {
  return await rt.get_all(db);
}