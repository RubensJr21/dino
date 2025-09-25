import * as std from "@data_functions/standard";
import { db } from "@database/db-instance";

export async function find_standard(standard_id: std.infer_select["id"]) {
  return await std.get(db, standard_id);
}