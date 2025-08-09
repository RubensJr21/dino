import { BankAccount } from "@src/core/entities/bank_account.entity";
import ListAllBankAccounts from "@src/core/use_cases/bank-account/list_all.use_case";
import { db } from "@src/infrastructure/database/client";
import BankAccountDrizzleRepository from "@src/infrastructure/repositories/bank_account.repository";
import { sql } from "drizzle-orm/sql";

async function list_all(): Promise<BankAccount[] | undefined> {
  db.run(sql.raw("BEGIN"))
  const repo = new BankAccountDrizzleRepository();
  const list_all = new ListAllBankAccounts(repo);
  const bank_accounts_founded = await list_all.execute();

  if (!bank_accounts_founded.success) {
    db.run(sql.raw("ROLLBACK"));
    return;
  }

  db.run(sql.raw("COMMIT"))
  return bank_accounts_founded.data
}

export default list_all;