import FindInstallmentReceiptById from "@core/use_cases/receipt/installment/find_by_id.use_case";
import { IInstallment, Installment } from "@domain/entities/installment.entity";
import { db } from "@server/infrastructure/database/drizzle/client";
import InstallmentDrizzleRepository from "@server/infrastructure/database/drizzle/repositories/installment.repository";

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
    
      const find_by_id = new FindInstallmentReceiptById(repo);
    
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