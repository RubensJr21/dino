import ListAllInstallmentsReceipt from "@core/use_cases/receipt/installment/list_all.use_case";
import { Installment } from "@domain/entities/installment.entity";
import { db } from "@server/infrastructure/database/drizzle/client";
import InstallmentDrizzleRepository from "@server/infrastructure/database/drizzle/repositories/installment.repository";

type Return = Installment[] | undefined

async function list_all_installment(): Promise<Return | undefined> {
  let result: Return = undefined

  try {
    result = db.transaction<Return>((tx) => {
      const repo = new InstallmentDrizzleRepository(tx);
      const list_all = new ListAllInstallmentsReceipt(repo);

      const list = list_all.execute()

      if (!list.success) {
        console.warn(list)
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

export default list_all_installment;