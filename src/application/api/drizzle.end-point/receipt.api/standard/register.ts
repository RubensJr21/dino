import { Standard } from "@src/core/entities/standard.entity";
import { CreateItemValueParams } from "@src/core/shared/interfaces/IRepoItemValue";
import RegisterStandardReceipt from "@src/core/use_cases/receipt/standard/register.use_case";
import { db } from "@src/infrastructure/database/client";
import ItemValueDrizzleRepository from "@src/infrastructure/repositories/item_value.repository";
import StandardDrizzleRepository from "@src/infrastructure/repositories/standard.repository";
import { sql } from "drizzle-orm/sql";

type Params = CreateItemValueParams

async function register({
  ...params
}: Params): Promise<Standard | undefined> {
  db.run(sql.raw("BEGIN"))
  const repo = new StandardDrizzleRepository();
  const repo_iv = new ItemValueDrizzleRepository();

  const register_standard = new RegisterStandardReceipt(repo, repo_iv);

  const standard_created = await register_standard.execute(params)

  if (!standard_created.success) {
    db.run(sql.raw("ROLLBACK"));
    return undefined;
  }

  db.run(sql.raw("COMMIT"))
  return standard_created.data;
}

export default register;