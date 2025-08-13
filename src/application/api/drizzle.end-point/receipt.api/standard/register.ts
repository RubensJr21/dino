import { Standard } from "@src/core/entities/standard.entity";
import { CreateItemValueParams } from "@src/core/shared/interfaces/IRepoItemValue";
import RegisterStandardReceipt from "@src/core/use_cases/receipt/standard/register.use_case";
import { db } from "@src/infrastructure/database/client";
import ItemValueDrizzleRepository from "@src/infrastructure/repositories/item_value.repository";
import StandardDrizzleRepository from "@src/infrastructure/repositories/standard.repository";

type Params = CreateItemValueParams

type Return = Standard | undefined

async function register({
  ...params
}: Params): Promise<Return> {
  let result: Return

  try {
    result = db.transaction<Return>((tx) => {
      const repo = new StandardDrizzleRepository(tx);
      const repo_iv = new ItemValueDrizzleRepository(tx);
    
      const register_standard = new RegisterStandardReceipt(repo, repo_iv);
    
      const standard_created = register_standard.execute(params)
    
      if (!standard_created.success) {
        tx.rollback();
        return;
      }
    
      return standard_created.data;
    })
  } catch (error) {
    // TODO: Aqui eu popularia o erro
  }
  return result;
}

export default register;