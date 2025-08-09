import { IStandard, Standard } from "@src/core/entities/standard.entity";
import FindStandardPaymentById from "@src/core/use_cases/payment/standard/find_by_id.use_case";
import { db } from "@src/infrastructure/database/client";
import StandardDrizzleRepository from "@src/infrastructure/repositories/standard.repository";
import { sql } from "drizzle-orm/sql";

interface Params {
  id: IStandard["id"]
}

async function find_by_id({
  id
}: Params): Promise<Standard | undefined> {
  db.run(sql.raw("BEGIN"))

  const repo = new StandardDrizzleRepository();

  const find_by_id = new FindStandardPaymentById(repo);

  const standard_founded = await find_by_id.execute({ id })

  if (!standard_founded.success) {
    db.run(sql.raw("ROLLBACK"))
    return undefined;
  }

  db.run(sql.raw("COMMIT"))
  return standard_founded.data
}

export default find_by_id;