import { IInstallment, Installment } from "@src/core/entities/installment.entity";
import FindInstallmentPaymentById from "@src/core/use_cases/payment/installment/find_by_id.use_case";
import { db } from "@src/infrastructure/database/client";
import InstallmentDrizzleRepository from "@src/infrastructure/repositories/installment.repository";

interface Params {
  id: IInstallment["id"]
}

type Return = Installment | undefined

async function find_by_id({
  id
}: Params): Promise<Return> {
  let result: Return

  try {
    result = db.transaction<Return>((tx) => {
      const repo = new InstallmentDrizzleRepository(tx);
    
      const find_by_id = new FindInstallmentPaymentById(repo);
    
      const installment_founded = find_by_id.execute({ id })
    
      if (!installment_founded.success) {
        tx.rollback()
        return undefined;
      }
    
      return installment_founded.data
    })
  } catch (error) {
    // TODO: Aqui eu popularia o erro
  }
  return result;
}

export default find_by_id;