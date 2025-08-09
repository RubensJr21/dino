import { Standard } from "@src/core/entities/standard.entity";
import ListAllStandardReceipts from "@src/core/use_cases/receipt/standard/list_all.use_case";
import { db } from "@src/infrastructure/database/client";
import StandardDrizzleRepository from "@src/infrastructure/repositories/standard.repository";
import { sql } from "drizzle-orm/sql";

async function list_all(): Promise<Standard[] | undefined> {
  db.run(sql.raw("BEGIN"))
  const repo = new StandardDrizzleRepository();
  const list_all = new ListAllStandardReceipts(repo);

  const list = await list_all.execute()

  if (!list.success) {
    db.run(sql.raw("ROLLBACK"));
    return undefined;
  }

  db.run(sql.raw("COMMIT"))
  return list.data
}

export default list_all;