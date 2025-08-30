import UpdateInstallmentReceipt from "@core/use_cases/receipt/installment/update.use_case";
import { IInstallment, Installment } from "@domain/entities/installment.entity";
import { UpdateInstallmentParams } from "@domain/repositories/IRepoInstallment";
import { db } from "@server/infrastructure/database/drizzle/client";
import InstallmentDrizzleRepository from "@server/infrastructure/database/drizzle/repositories/installment.repository";
import ItemValueDrizzleRepository from "@server/infrastructure/database/drizzle/repositories/item_value.repository";

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
      const update_installment = new UpdateInstallmentReceipt(repo, repo_iv);
    
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