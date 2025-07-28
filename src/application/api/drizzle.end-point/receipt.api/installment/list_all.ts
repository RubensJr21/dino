import { Installment } from "@src/core/entities/installment.entity";
import ListAllInstallmentsReceipt from "@src/core/use_cases/receipt/installment/list_all.use_case";
import { db } from "@src/infrastructure/database/client";
import InstallmentDrizzleRepository from "@src/infrastructure/repositories/installment.repository";

async function delete_installment(): Promise<Installment[] | undefined>{
  let list_receipts_installment: Installment[] | undefined = undefined

  await db.transaction(async tx => {
      const repo = new InstallmentDrizzleRepository(tx);
      const list_all = new ListAllInstallmentsReceipt(repo);
  
      const list = await list_all.execute()
      
      if(!list.success){
        tx.rollback();
        return;
      }
  
      list_receipts_installment = list.data
    })

  return list_receipts_installment
}

export default delete_installment;