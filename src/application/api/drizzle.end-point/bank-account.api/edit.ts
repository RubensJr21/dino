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

type Return = BankAccount | undefined

async function edit({
  id,
  new_nickname,
  type_of_bank_transfers
}: Params): Promise<Return> {
  let result: Return
  try {
    result = db.transaction<Return>((tx) => {
      const repo = new BankAccountDrizzleRepository(tx)

      const update_nickname = new UpdateNicknameBankAccount(repo)
      let bank_account_updated = update_nickname.execute({
        id,
        new_nickname
      })

      if (!bank_account_updated.success) {
        tx.rollback()
        return undefined
      }

      const repo_tm = new BankAccountTransferMethodDrizzleRepository(tx);
      const update_transfer_methods = new UpdateTransferMethodsBankAccount(repo, repo_tm)
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
  }
  return result;
}

export default edit;