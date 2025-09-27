import * as tm from "@data_functions/transfer_method";
import { db } from "@database/db-instance";

export async function find_all() {
  return await tm.get_all(db);
}