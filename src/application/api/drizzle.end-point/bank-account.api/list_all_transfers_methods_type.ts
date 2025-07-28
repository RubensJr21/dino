import { BankAccountTransferMethod, IBankAccountTransferMethod } from "@src/core/entities/bank_account_transfer_method.entity";
import ListAllTransfersMethodTypeBankAccount from "@src/core/use_cases/bank-account/list_all_transfers_method_type.use_case";
import { db } from "@src/infrastructure/database/client";
import BankAccountTransferMethodDrizzleRepository from "@src/infrastructure/repositories/bank_account_transfer_method.repository";

interface Params {
  id: IBankAccountTransferMethod["id"]
}

type Return = BankAccountTransferMethod[]

async function list_all_transfers_methods_type({
  id
}: Params): Promise<Return> {
  let last_bank_account_modified: Return = []
  // transaction aqui
  // instancio os repositórios
  await db.transaction(async tx => {
    const repo = new BankAccountTransferMethodDrizzleRepository(tx);
    // baseado no valor retornado do caso de uso eu dou rollback ou commit
    // se der erro, o tx é automaticamente rollbackado
    // se der certo, segue o fluxo normal
    const list_all_transfer_methods = new ListAllTransfersMethodTypeBankAccount(repo)
    const transfer_methods_founded = await list_all_transfer_methods.execute({ id })

    if (!transfer_methods_founded.success) {
      tx.rollback()
      return undefined
    }
    
    last_bank_account_modified = transfer_methods_founded.data
  })

  return last_bank_account_modified;
}

export default list_all_transfers_methods_type;