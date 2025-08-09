import { Installment } from "@src/core/entities/installment.entity";
import ListAllInstallmentsReceipt from "@src/core/use_cases/receipt/installment/list_all.use_case";
import { db } from "@src/infrastructure/database/client";
import InstallmentDrizzleRepository from "@src/infrastructure/repositories/installment.repository";
import { sql } from "drizzle-orm/sql";

async function delete_installment(): Promise<Installment[] | undefined> {
  db.run(sql.raw("BEGIN"))

  const repo = new InstallmentDrizzleRepository();
  const list_all = new ListAllInstallmentsReceipt(repo);

  const list = await list_all.execute()

  if (!list.success) {
    db.run(sql.raw("ROLLBACK"));
    return;
  }

  db.run(sql.raw("COMMIT"))
  return list.data
}

export default delete_installment;