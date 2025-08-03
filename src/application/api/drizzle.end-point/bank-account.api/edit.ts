import { BankAccount, IBankAccount } from "@src/core/entities/bank_account.entity";
import { TypeOfTransferMethods } from "@src/core/shared/types/transfer_methods";
import UpdateNicknameBankAccount from "@src/core/use_cases/bank-account/update_nickname.use_case";
import UpdateTransferMethodsBankAccount from "@src/core/use_cases/bank-account/update_transfer_methods.use_case";
import { db } from "@src/infrastructure/database/client";
import BankAccountDrizzleRepository from "@src/infrastructure/repositories/bank_account.repository";
import BankAccountTransferMethodDrizzleRepository from "@src/infrastructure/repositories/bank_account_transfer_method.repository";

interface Params {
  id: IBankAccount["id"],
  new_nickname: IBankAccount["nickname"],
  type_of_bank_transfers: Record<TypeOfTransferMethods, boolean>
}

async function edit({
  id,
  new_nickname,
  type_of_bank_transfers
}: Params): Promise<BankAccount | undefined> {
  let last_bank_account_modified: BankAccount | undefined = undefined
  // transaction aqui
  // instancio os repositórios
  await db.transaction(async tx => {
    const repo = new BankAccountDrizzleRepository(tx)
    // baseado no valor retornado do caso de uso eu dou rollback ou commit
    // se der erro, o tx é automaticamente rollbackado
    // se der certo, segue o fluxo normal
    const update_nickname = new UpdateNicknameBankAccount(repo)
    let bank_account_updated = await update_nickname.execute({
      id,
      new_nickname
    })

    if (!bank_account_updated.success) {
      tx.rollback()
      return undefined
    }

    const repo_tm = new BankAccountTransferMethodDrizzleRepository(tx);
    const update_transfer_methods = new UpdateTransferMethodsBankAccount(repo, repo_tm)
    const bank_account_transfers_updated = await update_transfer_methods.execute({
      id,
      type_of_bank_transfers
    });

    if(!bank_account_transfers_updated.success){
      tx.rollback()
      return undefined;
    }
    last_bank_account_modified = bank_account_transfers_updated.data
  })

  return last_bank_account_modified;
}

export default edit;