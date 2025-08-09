import { BankAccount, IBankAccount } from "@src/core/entities/bank_account.entity";
import { TypeOfTransferMethods } from "@src/core/shared/types/transfer_methods";
import UpdateNicknameBankAccount from "@src/core/use_cases/bank-account/update_nickname.use_case";
import UpdateTransferMethodsBankAccount from "@src/core/use_cases/bank-account/update_transfer_methods.use_case";
import { db } from "@src/infrastructure/database/client";
import BankAccountDrizzleRepository from "@src/infrastructure/repositories/bank_account.repository";
import BankAccountTransferMethodDrizzleRepository from "@src/infrastructure/repositories/bank_account_transfer_method.repository";
import { sql } from "drizzle-orm/sql";

interface Params {
  id: IBankAccount["id"],
  new_nickname: IBankAccount["nickname"],
  type_of_bank_transfers: Record<TypeOfTransferMethods, boolean>
}

async function edit({
  id,
  new_nickname,
  type_of_bank_transfers
}: Params): Promise<BankAccount | undefined> {
  db.run(sql.raw("BEGIN"))
  const repo = new BankAccountDrizzleRepository()

  const update_nickname = new UpdateNicknameBankAccount(repo)
  let bank_account_updated = await update_nickname.execute({
    id,
    new_nickname
  })

  if (!bank_account_updated.success) {
    db.run(sql.raw("ROLLBACK"))
    return undefined
  }

  const repo_tm = new BankAccountTransferMethodDrizzleRepository();
  const update_transfer_methods = new UpdateTransferMethodsBankAccount(repo, repo_tm)
  const bank_account_transfers_updated = await update_transfer_methods.execute({
    id,
    type_of_bank_transfers
  });

  if (!bank_account_transfers_updated.success) {
    db.run(sql.raw("ROLLBACK"))
    return undefined;
  }

  db.run(sql.raw("COMMIT"))
  return bank_account_transfers_updated.data;
}

export default edit;