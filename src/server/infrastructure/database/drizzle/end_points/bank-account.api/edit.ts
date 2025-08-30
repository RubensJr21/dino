import UpdateNicknameBankAccount from "@core/use_cases/bank-account/update_nickname.use_case";
import UpdateTransferMethodsBankAccount from "@core/use_cases/bank-account/update_transfer_methods.use_case";
import { BankAccount, IBankAccount } from "@domain/entities/bank_account.entity";
import { db } from "@server/infrastructure/database/drizzle/client";
import BankAccountDrizzleRepository from "@server/infrastructure/database/drizzle/repositories/bank_account.repository";
import BankAccountTransferMethodDrizzleRepository from "@server/infrastructure/database/drizzle/repositories/bank_account_transfer_method.repository";
import TransferMethodDrizzleRepository from "@server/infrastructure/database/drizzle/repositories/transfer_method.repository";

interface Params {
  id: IBankAccount["id"],
  new_nickname: IBankAccount["nickname"],
  type_of_bank_transfers: Array<string>
}

type Return = BankAccount | undefined

async function edit({
  id,
  new_nickname,
  type_of_bank_transfers
}: Params): Promise<Return> {
  let result: Return
  try {
    result = db.transaction<Return>((tx) => {
      const repo_ba = new BankAccountDrizzleRepository(tx)

      const update_nickname = new UpdateNicknameBankAccount(repo_ba)
      let bank_account_updated = update_nickname.execute({
        id,
        new_nickname
      })

      if (!bank_account_updated.success) {
        tx.rollback()
        return undefined
      }

      const repo_ba_tm = new BankAccountTransferMethodDrizzleRepository(tx);
      const repo_tm = new TransferMethodDrizzleRepository(tx);
      const update_transfer_methods = new UpdateTransferMethodsBankAccount(repo_ba, repo_ba_tm, repo_tm)
      const bank_account_transfers_updated = update_transfer_methods.execute({
        id,
        type_of_bank_transfers
      });

      
      if (!bank_account_transfers_updated.success) {
        tx.rollback()
        return undefined;
      }

      return bank_account_transfers_updated.data;
    })
  } catch (error) {
    // TODO: Aqui eu popularia o erro
    console.error(error)
  }
  return result;
}

export default edit;