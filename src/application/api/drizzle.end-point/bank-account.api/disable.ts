import { BankAccount, IBankAccount } from "@src/core/entities/bank_account.entity";
import DisableBankAccount from "@src/core/use_cases/bank-account/disable.use_case";
import { db } from "@src/infrastructure/database/client";
import BankAccountDrizzleRepository from "@src/infrastructure/repositories/bank_account.repository";

interface Params {
  id: IBankAccount["id"]
}

async function disable({
  id
}: Params): Promise<BankAccount | undefined> {
  let last_bank_account_modified: BankAccount | undefined = undefined
  // transaction aqui
  // instancio os repositórios
  await db.transaction(async tx => {
    const repo = new BankAccountDrizzleRepository(tx)
    // baseado no valor retornado do caso de uso eu dou rollback ou commit
    // se der erro, o tx é automaticamente rollbackado
    // se der certo, segue o fluxo normal
    const disable_bank_account = new DisableBankAccount(repo)
    const bank_account_disabled = await disable_bank_account.execute({
      id
    })

    if (!bank_account_disabled.success) {
      tx.rollback()
      return undefined
    }
    
    last_bank_account_modified = bank_account_disabled.data
  })

  return last_bank_account_modified;
}

export default disable;