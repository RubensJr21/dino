import * as std from "@data_functions/standard"
import { db } from "@database/db-instance"

export async function list_all() {
  return await std.get_all(db)
}