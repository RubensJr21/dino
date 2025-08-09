import { BankAccount, IBankAccount } from "@src/core/entities/bank_account.entity";
import { TypeOfTransferMethods } from "@src/core/shared/types/transfer_methods";
import RegisterBankAccount from "@src/core/use_cases/bank-account/register.use_case";
import { db } from "@src/infrastructure/database/client";
import BankAccountDrizzleRepository from "@src/infrastructure/repositories/bank_account.repository";
import BankAccountTransferMethodDrizzleRepository from "@src/infrastructure/repositories/bank_account_transfer_method.repository";
import TransferMethodDrizzleRepository from "@src/infrastructure/repositories/transfer_method.repository";
import { sql } from "drizzle-orm/sql";

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
  db.run(sql.raw("BEGIN"))

  const repo = new BankAccountDrizzleRepository()
  const repo_tm = new TransferMethodDrizzleRepository();
  const repo_ba_tm = new BankAccountTransferMethodDrizzleRepository();

  const register_bank_account = new RegisterBankAccount(repo, repo_tm, repo_ba_tm)
  const bank_account_registered = await register_bank_account.execute({
    balance,
    nickname,
    type_of_bank_transfers
  })
  
  if (!bank_account_registered.success) {
    db.run(sql.raw("ROLLBACK"))
    return undefined;
  }

  db.run(sql.raw("COMMIT"))
  return bank_account_registered.data;
}

export default register;