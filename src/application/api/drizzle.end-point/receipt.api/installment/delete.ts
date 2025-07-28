import { IInstallment } from "@src/core/entities/installment.entity";
import DeleteInstallmentReceipt from "@src/core/use_cases/receipt/installment/delete.use_case";
import { db } from "@src/infrastructure/database/client";
import InstallmentDrizzleRepository from "@src/infrastructure/repositories/installment.repository";

interface Params {
  id: IInstallment["id"]
}

async function delete_installment({
  id
}: Params): Promise<boolean> {
  let last_installment_modified: boolean = false;
  
  await db.transaction(async tx => {
    const repo = new InstallmentDrizzleRepository(tx);
    const delete_installment = new DeleteInstallmentReceipt(repo);

    const installment_deleted = await delete_installment.execute({id})

    if(!installment_deleted.success){
      tx.rollback();
      return;
    }

    last_installment_modified = true
  })
  
  return last_installment_modified;
}

export default delete_installment;