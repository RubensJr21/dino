import { IInstallment, Installment } from "@src/core/entities/installment.entity";
import { UpdateInstallmentParams } from "@src/core/shared/interfaces/IRepoInstallment";
import UpdateInstallmentPayment from "@src/core/use_cases/payment/installment/update.use_case";
import { db } from "@src/infrastructure/database/client";
import InstallmentDrizzleRepository from "@src/infrastructure/repositories/installment.repository";
import ItemValueDrizzleRepository from "@src/infrastructure/repositories/item_value.repository";

interface Params {
  id: IInstallment["id"];
  data: UpdateInstallmentParams
}

type Return = Installment | undefined

async function edit({
  id,
  data
}: Params): Promise<Installment | undefined> {
  let result: Return

  try {
    result = db.transaction<Return>((tx) => {
      const repo = new InstallmentDrizzleRepository(tx);
      const repo_iv = new ItemValueDrizzleRepository(tx);
      const update_installment = new UpdateInstallmentPayment(repo, repo_iv);
    
      const installment_edited = update_installment.execute({
        id,
        data
      })
    
      if (!installment_edited.success) {
        tx.rollback();
        return undefined;
      }
    
      return installment_edited.data;
    })
  } catch (error) {
    // TODO: Aqui eu popularia o erro
  }
  return result;
}

export default edit;