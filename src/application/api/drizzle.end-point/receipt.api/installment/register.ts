import { Installment } from "@src/core/entities/installment.entity";
import { CreateInstallmentParams } from "@src/core/shared/interfaces/IRepoInstallment";
import RegisterInstallmentReceipt from "@src/core/use_cases/receipt/installment/register.use_case";
import { db } from "@src/infrastructure/database/client";
import InstallmentDrizzleRepository from "@src/infrastructure/repositories/installment.repository";
import ItemValueDrizzleRepository from "@src/infrastructure/repositories/item_value.repository";

type Params = CreateInstallmentParams

async function register({
  ...params
}: Params): Promise<Installment | undefined> {
  let last_installment_created: Installment | undefined = undefined;

  await db.transaction(async tx => {
    const repo = new InstallmentDrizzleRepository(tx);
    const repo_iv = new ItemValueDrizzleRepository(tx);
    
    const register_installment = new RegisterInstallmentReceipt(repo, repo_iv);

    const installment_created = await register_installment.execute(params)

    if (!installment_created.success) {
      tx.rollback();
      return;
    }

    last_installment_created = installment_created.data;
  })

  return last_installment_created;
}

export default register;