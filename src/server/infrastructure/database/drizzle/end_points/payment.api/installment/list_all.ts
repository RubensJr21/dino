import ListAllInstallmentsPayment from "@core/use_cases/payment/installment/list_all.use_case";
import { Installment } from "@domain/entities/installment.entity";
import { db } from "@server/infrastructure/database/drizzle/client";
import InstallmentDrizzleRepository from "@server/infrastructure/database/drizzle/repositories/installment.repository";

type Return = Installment[] | undefined

async function delete_installment(): Promise<Return> {
  let result: Return

  try {
    result = db.transaction<Return>((tx) => {
      const repo = new InstallmentDrizzleRepository(tx);
      const list_all = new ListAllInstallmentsPayment(repo);
    
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