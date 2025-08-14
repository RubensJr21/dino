import { BankAccount, IBankAccount } from "@src/core/entities/bank_account.entity";
import RegisterBankAccount from "@src/core/use_cases/bank-account/register.use_case";
import { db } from "@src/infrastructure/database/client";
import BankAccountDrizzleRepository from "@src/infrastructure/repositories/bank_account.repository";
import BankAccountTransferMethodDrizzleRepository from "@src/infrastructure/repositories/bank_account_transfer_method.repository";
import TransferMethodDrizzleRepository from "@src/infrastructure/repositories/transfer_method.repository";

interface Params {
  balance: IBankAccount["balance"];
  nickname: IBankAccount["nickname"];
  type_of_bank_transfers: Array<string>
}

type Return = BankAccount | undefined

async function register({
  balance,
  nickname,
  type_of_bank_transfers
}: Params): Promise<Return> {
  let result: Return

  try {
    result = db.transaction<Return>((tx) => {
      const repo = new BankAccountDrizzleRepository(tx)
      const repo_tm = new TransferMethodDrizzleRepository(tx);
      const repo_ba_tm = new BankAccountTransferMethodDrizzleRepository(tx);

      const register_bank_account = new RegisterBankAccount(repo, repo_tm, repo_ba_tm)
      const bank_account_registered = register_bank_account.execute({
        balance,
        nickname,
        type_of_bank_transfers
      })

      console.log(bank_account_registered)

      if (!bank_account_registered.success) {
        tx.rollback()
        return undefined;
      }

      return bank_account_registered.data;
    })
  } catch (error) {
    // TODO: Aqui eu popularia o erro
  }
  return result;
}

export default register;