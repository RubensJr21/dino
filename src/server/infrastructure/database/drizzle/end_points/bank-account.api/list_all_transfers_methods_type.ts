import ListAllTransfersMethodTypeBankAccount from "@core/use_cases/bank-account/list_all_transfers_method_type.use_case";
import { BankAccountTransferMethod, IBankAccountTransferMethod } from "@domain/entities/bank_account_transfer_method.entity";
import { db } from "@server/infrastructure/database/drizzle/client";
import BankAccountTransferMethodDrizzleRepository from "@server/infrastructure/database/drizzle/repositories/bank_account_transfer_method.repository";

interface Params {
  id: IBankAccountTransferMethod["id"]
}

type Return = BankAccountTransferMethod[] | undefined

async function list_all_transfers_methods_type({
  id
}: Params): Promise<Return> {
  let result: Return
  try {
    const resultado = await db.transaction<Promise<Return>>(async (tx) => {
      const repo = new BankAccountTransferMethodDrizzleRepository(tx);
      const list_all_transfer_methods = new ListAllTransfersMethodTypeBankAccount(repo)
      const transfer_methods_founded = list_all_transfer_methods.execute({ id })

      if (!transfer_methods_founded.success) {
        console.error(transfer_methods_founded.error)
        tx.rollback()
        return undefined;
      }

      return transfer_methods_founded.data
    })
    result = resultado;
  } catch (error) {
    // console.warn("list_all_transfers_methods_type.ts", error)
    result = undefined
  }
  return result
}

export default list_all_transfers_methods_type;