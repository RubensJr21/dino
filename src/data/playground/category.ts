import * as cat from "@data_functions/category";
import { db } from "@database/db-instance";

export async function find_all(){
  return await cat.get_all(db)
}