import { BankAccount } from "@src/core/entities/bank_account.entity";
import ListAllBankAccounts from "@src/core/use_cases/bank-account/list_all.use_case";
import { db } from "@src/infrastructure/database/client";
import BankAccountDrizzleRepository from "@src/infrastructure/repositories/bank_account.repository";

type Return = BankAccount[] | undefined

async function list_all(): Promise<Return> {
  let result: Return
  
  try {
    result = db.transaction<Return>((tx) => {
      const repo = new BankAccountDrizzleRepository(tx);
      const list_all = new ListAllBankAccounts(repo);
      const bank_accounts_founded = list_all.execute();
  
      if (!bank_accounts_founded.success) {
        tx.rollback()
        return undefined;
      }
      return bank_accounts_founded.data
    })
  } catch (error) {
    // TODO: Aqui eu popularia o erro
  }
  return result;
}

export default list_all;