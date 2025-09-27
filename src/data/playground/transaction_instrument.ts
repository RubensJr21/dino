import * as ti from "@data_functions/transaction_instrument";
import { db } from "@database/db-instance";

export async function find_all_enable_for_transfer_method(code: string) {
  return await ti.get_all_enable_filtered_by_transfer_method(db, code);
}

export async function find_all() {
  return await ti.get_all(db)
}

export async function find_all_used_transfer_methods() {
  return await ti.get_all_used_transfer_methods(db)
}

export async function get_transaction_instrument_cash() {
  return await ti.get_transaction_instrument_cash(db)
}