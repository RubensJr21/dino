import { BankAccount, IBankAccount } from "@src/core/entities/bank_account.entity";
import DisableBankAccount from "@src/core/use_cases/bank-account/disable.use_case";
import { db } from "@src/infrastructure/database/client";
import BankAccountDrizzleRepository from "@src/infrastructure/repositories/bank_account.repository";

interface Params {
  id: IBankAccount["id"]
}

type Return = BankAccount | undefined

async function disable({
  id
}: Params): Promise<Return> {
  let result: Return

  try {
    result = db.transaction<Return>((tx) => {
      const repo = new BankAccountDrizzleRepository(tx)
      const disable_bank_account = new DisableBankAccount(repo)
  
      const bank_account_disabled = disable_bank_account.execute({
        id
      })
  
      if (!bank_account_disabled.success) {
        tx.rollback()
        return undefined;
      }
      return bank_account_disabled.data;
    })
  } catch (error) {
    // TODO: Aqui eu popularia o erro
  }
  return result;
}

export default disable;