import * as ba from "@data_functions/bank_account";
import * as ti from "@data_functions/transaction_instrument";
import { db } from "@database/db-instance";

export async function find_by_id(bank_account_id: string) {
  const id = Number(bank_account_id)
  if (id < 0) {
    return undefined
  }
  const bank_account = await ba.get(db, id)
  if (bank_account === undefined) {
    return undefined
  }
  const transfer_methods_enable = (await ti.get_all_enable_filtered_by_bank_account(db, bank_account.id)).map(({ code }) => code)

  return {
    ...bank_account,
    transfer_methods_enable
  }
}