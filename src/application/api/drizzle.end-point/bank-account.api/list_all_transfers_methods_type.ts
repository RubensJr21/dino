import { BankAccountTransferMethod, IBankAccountTransferMethod } from "@src/core/entities/bank_account_transfer_method.entity";
import ListAllTransfersMethodTypeBankAccount from "@src/core/use_cases/bank-account/list_all_transfers_method_type.use_case";
import { db } from "@src/infrastructure/database/client";
import BankAccountTransferMethodDrizzleRepository from "@src/infrastructure/repositories/bank_account_transfer_method.repository";
import { sql } from "drizzle-orm/sql";

interface Params {
  id: IBankAccountTransferMethod["id"]
}

type Return = BankAccountTransferMethod[] | undefined

async function list_all_transfers_methods_type({
  id
}: Params): Promise<Return> {
  db.run(sql.raw("BEGIN"))
  const repo = new BankAccountTransferMethodDrizzleRepository();
  const list_all_transfer_methods = new ListAllTransfersMethodTypeBankAccount(repo)
  const transfer_methods_founded = await list_all_transfer_methods.execute({ id })

  if (!transfer_methods_founded.success) {
    db.run(sql.raw("ROLLBACK"));
    return undefined;
  }

  db.run(sql.raw("COMMIT"))
  return transfer_methods_founded.data
}

export default list_all_transfers_methods_type;