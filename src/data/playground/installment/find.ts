import * as imt from "@data_functions/installment";
import { db } from "@database/db-instance";

export async function find_installment(installment_id: imt.infer_select["id"]) {
  return await imt.get(db, installment_id);
}