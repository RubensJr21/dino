import { BankAccount, IBankAccount } from "@src/core/entities/bank_account.entity";
import { TypeOfTransferMethods } from "@src/core/shared/types/transfer_methods";
import RegisterBankAccount from "@src/core/use_cases/bank-account/register.use_case";
import { db } from "@src/infrastructure/database/client";
import BankAccountDrizzleRepository from "@src/infrastructure/repositories/bank_account.repository";
import BankAccountTransferMethodDrizzleRepository from "@src/infrastructure/repositories/bank_account_transfer_method.repository";
import TransferMethodDrizzleRepository from "@src/infrastructure/repositories/transfer_method.repository";

interface Params {
  balance: IBankAccount["balance"];
  nickname: IBankAccount["nickname"];
  type_of_bank_transfers: Record<TypeOfTransferMethods, boolean>
}

async function register({
  balance,
  nickname,
  type_of_bank_transfers
}: Params): Promise<BankAccount | undefined> {
  let last_bank_account_modified: BankAccount | undefined = undefined
  // transaction aqui
  // instancio os repositórios
  await db.transaction(async tx => {
    const repo = new BankAccountDrizzleRepository(tx)
    const repo_tm = new TransferMethodDrizzleRepository(tx);
    const repo_ba_tm = new BankAccountTransferMethodDrizzleRepository(tx);
    // baseado no valor retornado do caso de uso eu dou rollback ou commit
    // se der erro, o tx é automaticamente rollbackado
    // se der certo, segue o fluxo normal
    const register_bank_account = new RegisterBankAccount(repo, repo_tm, repo_ba_tm)
    const bank_account_registered = await register_bank_account.execute({
      balance,
      nickname,
      type_of_bank_transfers
    })

    if (!bank_account_registered.success) {
      tx.rollback()
      last_bank_account_modified = undefined;
      return;
    }
    
    last_bank_account_modified = bank_account_registered.data
  })

  return last_bank_account_modified;
}

export default register;