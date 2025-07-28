import { IInstallment, Installment } from "@src/core/entities/installment.entity";
import FindInstallmentPaymentById from "@src/core/use_cases/payment/installment/find_by_id.use_case";
import { db } from "@src/infrastructure/database/client";
import InstallmentDrizzleRepository from "@src/infrastructure/repositories/installment.repository";

interface Params {
  id: IInstallment["id"]
}

async function find_by_id({
  id
}: Params): Promise<Installment | undefined> {
  let last_installment_founded: Installment | undefined = undefined;
  
    await db.transaction(async tx => {
      const repo = new InstallmentDrizzleRepository(tx);

      const find_by_id = new FindInstallmentPaymentById(repo);
  
      const installment_founded = await find_by_id.execute({id})
  
      if(!installment_founded.success){
        tx.rollback()
        return;
      }
      
      last_installment_founded = installment_founded.data
    })
  
    return last_installment_founded;
}

export default find_by_id;