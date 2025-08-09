import { IStandard, Standard } from "@src/core/entities/standard.entity";
import MarkStandardPaymentAsProcessed from "@src/core/use_cases/payment/standard/mark_as_processed.use_case";
import { db } from "@src/infrastructure/database/client";
import ItemValueDrizzleRepository from "@src/infrastructure/repositories/item_value.repository";
import StandardDrizzleRepository from "@src/infrastructure/repositories/standard.repository";
import { sql } from "drizzle-orm/sql";

interface Params {
  id: IStandard["id"]
}

async function mark_as_processed({
  id
}: Params): Promise<Standard | undefined> {
  db.run(sql.raw("BEGIN"))

  const repo = new StandardDrizzleRepository();
  const repo_iv = new ItemValueDrizzleRepository();
  const mark_as_processed = new MarkStandardPaymentAsProcessed(repo, repo_iv);

  const standard_processed = await mark_as_processed.execute({ id })

  if (!standard_processed.success) {
    db.run(sql.raw("ROLLBACK"))
    return undefined;
  }

  db.run(sql.raw("COMMIT"))
  return standard_processed.data;
}

export default mark_as_processed;