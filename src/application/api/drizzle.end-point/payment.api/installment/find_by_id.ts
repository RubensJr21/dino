import { IInstallment, Installment } from "@src/core/entities/installment.entity";
import FindInstallmentPaymentById from "@src/core/use_cases/payment/installment/find_by_id.use_case";
import { db } from "@src/infrastructure/database/client";
import InstallmentDrizzleRepository from "@src/infrastructure/repositories/installment.repository";
import { sql } from "drizzle-orm/sql";

interface Params {
  id: IInstallment["id"]
}

async function find_by_id({
  id
}: Params): Promise<Installment | undefined> {
  db.run(sql.raw("BEGIN"))
  const repo = new InstallmentDrizzleRepository();

  const find_by_id = new FindInstallmentPaymentById(repo);

  const installment_founded = await find_by_id.execute({ id })

  if (!installment_founded.success) {
    db.run(sql.raw("ROLLBACK"))
    return undefined;
  }

  db.run(sql.raw("COMMIT"))
  return installment_founded.data
}

export default find_by_id;