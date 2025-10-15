import * as ba from "@data_functions/bank_account";
import { db } from "@database/db-instance";

export async function list_all_banks(){
  return await ba.get_all(db);
}