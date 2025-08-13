import { BankAccount } from "@src/core/entities/bank_account.entity";
import ListAllBankAccounts from "@src/core/use_cases/bank-account/list_all.use_case";
import { db } from "@src/infrastructure/database/client";
import BankAccountDrizzleRepository from "@src/infrastructure/repositories/bank_account.repository";

type Return = BankAccount[] | undefined

async function list_all(): Promise<Return> {
  let result: Return

  const resultado = await db.transaction(async (tx) => {
    const repo = new BankAccountDrizzleRepository(tx);
    const list_all = new ListAllBankAccounts(repo);
    const bank_accounts_founded = list_all.execute();

    if (!bank_accounts_founded.success) {
      tx.rollback()
      return undefined;
    }
    return bank_accounts_founded.data
  })
    .then((result) => result)
    .catch((error) => {
      console.error("list_all.ts", error)
      return undefined
    })
  result = resultado
  return result;
}

export default list_all;