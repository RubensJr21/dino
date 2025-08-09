import { BankAccount, IBankAccount } from "@src/core/entities/bank_account.entity";
import EnableBankAccount from "@src/core/use_cases/bank-account/enable.use_case";
import { db } from "@src/infrastructure/database/client";
import BankAccountDrizzleRepository from "@src/infrastructure/repositories/bank_account.repository";
import { sql } from "drizzle-orm/sql";

interface Params {
  id: IBankAccount["id"]
}

async function enable({
  id
}: Params): Promise<BankAccount | undefined> {
  db.run(sql.raw("BEGIN"))
  const repo = new BankAccountDrizzleRepository()
  const enable_bank_account = new EnableBankAccount(repo)
  const bank_account_enabled = await enable_bank_account.execute({
    id
  })

  if (!bank_account_enabled.success) {
    db.run(sql.raw("ROLLBACK"))
    return undefined
  }

  db.run(sql.raw("COMMIT"))
  return bank_account_enabled.data;
}

export default enable;