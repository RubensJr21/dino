import { Standard } from "@src/core/entities/standard.entity";
import ListAllStandardPayments from "@src/core/use_cases/payment/standard/list_all.use_case";
import { db } from "@src/infrastructure/database/client";
import StandardDrizzleRepository from "@src/infrastructure/repositories/standard.repository";

async function list_all(): Promise<Standard[] | undefined> {
  let list_payments_standard: Standard[] | undefined = undefined

  await db.transaction(async tx => {
    const repo = new StandardDrizzleRepository(tx);
    const list_all = new ListAllStandardPayments(repo);

    const list = await list_all.execute()
    
    if(!list.success){
      tx.rollback();
      return;
    }

    list_payments_standard = list.data
  })

  return list_payments_standard
}

export default list_all;