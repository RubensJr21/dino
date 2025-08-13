import { IInstallment } from "@src/core/entities/installment.entity";
import DeleteInstallmentPayment from "@src/core/use_cases/payment/installment/delete.use_case";
import { db } from "@src/infrastructure/database/client";
import InstallmentDrizzleRepository from "@src/infrastructure/repositories/installment.repository";

interface Params {
  id: IInstallment["id"]
}

type Return = boolean | undefined

async function delete_installment({
  id
}: Params): Promise<boolean | undefined> {
  let result: Return

  try {
    result = db.transaction<Return>((tx) => {
      const repo = new InstallmentDrizzleRepository(tx);
      const delete_installment = new DeleteInstallmentPayment(repo);
    
      const installment_deleted = delete_installment.execute({ id })
    
      if (!installment_deleted.success) {
        tx.rollback();
        return undefined;
      }
      
      return true
    })
  } catch (error) {
    // TODO: Aqui eu popularia o erro
  }
  return result;

}

export default delete_installment;