import { BankAccount, IBankAccount } from "@src/core/entities/bank_account.entity";
import DisableBankAccount from "@src/core/use_cases/bank-account/disable.use_case";
import { db } from "@src/infrastructure/database/client";
import BankAccountDrizzleRepository from "@src/infrastructure/repositories/bank_account.repository";
import { sql } from "drizzle-orm/sql";

interface Params {
  id: IBankAccount["id"]
}

async function disable({
  id
}: Params): Promise<BankAccount | undefined> {
  db.run(sql.raw("BEGIN"))

  const repo = new BankAccountDrizzleRepository()
  const disable_bank_account = new DisableBankAccount(repo)
  
  const bank_account_disabled = await disable_bank_account.execute({
    id
  })

  if (!bank_account_disabled.success) {
    db.run(sql.raw("ROLLBACK"))
    return undefined;
  }

  db.run(sql.raw("COMMIT"))
  return bank_account_disabled.data;
}

export default disable;