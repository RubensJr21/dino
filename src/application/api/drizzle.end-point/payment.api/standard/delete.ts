import { IStandard } from "@src/core/entities/standard.entity";
import DeletePaymentStandard from "@src/core/use_cases/payment/standard/delete.use_case";
import { db } from "@src/infrastructure/database/client";
import ItemValueDrizzleRepository from "@src/infrastructure/repositories/item_value.repository";
import StandardDrizzleRepository from "@src/infrastructure/repositories/standard.repository";
import { sql } from "drizzle-orm/sql";

interface Params {
  id: IStandard["id"];
}

async function delete_standard({
  id
}: Params): Promise<boolean | undefined> {
  db.run(sql.raw("BEGIN"))
  const repo = new StandardDrizzleRepository();
  const repo_iv = new ItemValueDrizzleRepository();
  const delete_standard = new DeletePaymentStandard(repo, repo_iv);

  const standard_deleted = await delete_standard.execute({ id })

  if (!standard_deleted.success) {
    db.run(sql.raw("ROLLBACK"));
    return undefined;
  }

  db.run(sql.raw("COMMIT"))
  return true
}

export default delete_standard;