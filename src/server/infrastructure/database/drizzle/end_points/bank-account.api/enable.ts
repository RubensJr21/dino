import EnableBankAccount from "@core/use_cases/bank-account/enable.use_case";
import { BankAccount, IBankAccount } from "@domain/entities/bank_account.entity";
import { db } from "@server/infrastructure/database/drizzle/client";
import BankAccountDrizzleRepository from "@server/infrastructure/database/drizzle/repositories/bank_account.repository";

interface Params {
  id: IBankAccount["id"]
}

type Return = BankAccount | undefined

async function enable({
  id
}: Params): Promise<Return> {
  let result: Return

  try {
    result = db.transaction<Return>((tx) => {
      const repo = new BankAccountDrizzleRepository(tx)
      const enable_bank_account = new EnableBankAccount(repo)
      const bank_account_enabled = enable_bank_account.execute({
        id
      })
    
      if (!bank_account_enabled.success) {
        tx.rollback()
        return undefined
      }
    
      return bank_account_enabled.data;
    })
  } catch (error) {
    // TODO: Aqui eu popularia o erro
  }
  return result;

}

export default enable;