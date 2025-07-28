import { BankAccount } from "@src/core/entities/bank_account.entity";
import ListAllBankAccounts from "@src/core/use_cases/bank-account/list_all.use_case";
import { db } from "@src/infrastructure/database/client";
import BankAccountDrizzleRepository from "@src/infrastructure/repositories/bank_account.repository";

async function list_all(): Promise<BankAccount[] | undefined> {
  let last_bank_account_modified: BankAccount[] | undefined = undefined;
  
  await db.transaction(async tx => {
    const repo = new BankAccountDrizzleRepository(tx);
    const list_all = new ListAllBankAccounts(repo);
    const bank_accounts_founded = await list_all.execute();

    if(!bank_accounts_founded.success) {
      tx.rollback();
      return;
    }

    last_bank_account_modified = bank_accounts_founded.data
  })
  return last_bank_account_modified
}

export default list_all;