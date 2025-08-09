import { Standard } from "@src/core/entities/standard.entity";
import { CreateItemValueParams } from "@src/core/shared/interfaces/IRepoItemValue";
import RegisterStandardPayment from "@src/core/use_cases/payment/standard/register.use_case";
import { db } from "@src/infrastructure/database/client";
import ItemValueDrizzleRepository from "@src/infrastructure/repositories/item_value.repository";
import StandardDrizzleRepository from "@src/infrastructure/repositories/standard.repository";
import { sql } from "drizzle-orm/sql";

type Params = CreateItemValueParams

async function register({
  ...params
}: Params): Promise<Standard | undefined> {
  db.run(sql.raw("BEGIN"));
  const repo = new StandardDrizzleRepository();
  const repo_iv = new ItemValueDrizzleRepository();

  const register_standard = new RegisterStandardPayment(repo, repo_iv);

  const standard_created = await register_standard.execute(params)

  if (!standard_created.success) {
    db.run(sql.raw("ROLLBACK"));
    return;
  }

  db.run(sql.raw("COMMIT"))
  return standard_created.data;
}

export default register;