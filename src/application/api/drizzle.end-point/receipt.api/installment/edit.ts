import { IInstallment, Installment } from "@src/core/entities/installment.entity";
import { UpdateInstallmentParams } from "@src/core/shared/interfaces/IRepoInstallment";
import UpdateInstallmentReceipt from "@src/core/use_cases/receipt/installment/update.use_case";
import { db } from "@src/infrastructure/database/client";
import InstallmentDrizzleRepository from "@src/infrastructure/repositories/installment.repository";
import ItemValueDrizzleRepository from "@src/infrastructure/repositories/item_value.repository";
import { sql } from "drizzle-orm/sql";

interface Params {
  id: IInstallment["id"];
  data: UpdateInstallmentParams
}

async function edit({
  id,
  data
}: Params): Promise<Installment | undefined> {
  db.run(sql.raw("BEGIN"))

  const repo = new InstallmentDrizzleRepository();
  const repo_iv = new ItemValueDrizzleRepository();
  const update_installment = new UpdateInstallmentReceipt(repo, repo_iv);

  const installment_edited = await update_installment.execute({
    id,
    data
  })

  if(!installment_edited.success){
    db.run(sql.raw("ROLLBACK"))
    return undefined;
  }

  db.run(sql.raw("COMMIT"))
  return installment_edited.data;
}

export default edit;