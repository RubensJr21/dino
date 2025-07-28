import { Standard } from "@src/core/entities/standard.entity";
import { CreateItemValueParams } from "@src/core/shared/interfaces/IRepoItemValue";
import RegisterStandardPayment from "@src/core/use_cases/payment/standard/register.use_case";
import { db } from "@src/infrastructure/database/client";
import ItemValueDrizzleRepository from "@src/infrastructure/repositories/item_value.repository";
import StandardDrizzleRepository from "@src/infrastructure/repositories/standard.repository";

type Params = CreateItemValueParams

async function register({
  ...params
}: Params): Promise<Standard | undefined> {
  let last_standard_created: Standard | undefined = undefined;
  await db.transaction(async tx => {
    const repo = new StandardDrizzleRepository(tx);
    const repo_iv = new ItemValueDrizzleRepository(tx);

    const register_standard = new RegisterStandardPayment(repo, repo_iv);

    const standard_created = await register_standard.execute(params)

    if(!standard_created.success){
      tx.rollback();
      return;
    }

    last_standard_created = standard_created.data;
  })
  
  return last_standard_created;
}

export default register;