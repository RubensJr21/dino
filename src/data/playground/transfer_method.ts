import * as tm from "@data_functions/transfer_method";
import { db } from "@database/db-instance";

export async function find_all() {
  return await tm.get_all(db);
}
export async function find_all_without_code(code: tm.infer_select["code"] | tm.infer_select["code"][]){
  return await tm.get_all_without_code(db, code)
}