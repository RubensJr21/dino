import { Installment } from "@src/core/entities/installment.entity";
import ListAllInstallmentsReceipt from "@src/core/use_cases/receipt/installment/list_all.use_case";
import { db } from "@src/infrastructure/database/client";
import InstallmentDrizzleRepository from "@src/infrastructure/repositories/installment.repository";

type Return = Installment[] | undefined

async function delete_installment(): Promise<Return> {
  let result: Return

  try {
    result = db.transaction<Return>((tx) => {
      const repo = new InstallmentDrizzleRepository(tx);
      const list_all = new ListAllInstallmentsReceipt(repo);
    
      const list = list_all.execute()
    
      if (!list.success) {
        tx.rollback();
        return;
      }
      return list.data
    })
  } catch (error) {
    // TODO: Aqui eu popularia o erro
  }
  return result;

}

export default delete_installment;