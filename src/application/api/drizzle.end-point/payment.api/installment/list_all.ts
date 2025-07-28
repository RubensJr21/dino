import { Installment } from "@src/core/entities/installment.entity";
import ListAllInstallmentsPayment from "@src/core/use_cases/payment/installment/list_all.use_case";
import { db } from "@src/infrastructure/database/client";
import InstallmentDrizzleRepository from "@src/infrastructure/repositories/installment.repository";

async function delete_installment(): Promise<Installment[] | undefined>{
  let list_payments_installment: Installment[] | undefined = undefined

  await db.transaction(async tx => {
      const repo = new InstallmentDrizzleRepository(tx);
      const list_all = new ListAllInstallmentsPayment(repo);
  
      const list = await list_all.execute()
      
      if(!list.success){
        tx.rollback();
        return;
      }
  
      list_payments_installment = list.data
    })

  return list_payments_installment
}

export default delete_installment;