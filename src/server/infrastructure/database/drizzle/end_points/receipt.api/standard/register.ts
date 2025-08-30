import { TypeOfVariants } from "@core-types/variants_items";
import RegisterStandardReceipt from "@core/use_cases/receipt/standard/register.use_case";
import { IItemValue } from "@domain/entities/item_value.entity";
import { IStandard, Standard } from "@domain/entities/standard.entity";
import { Tag } from "@domain/entities/tag.entity";
import { TransferMethod } from "@domain/entities/transfer_method.entity";
import { db } from "@server/infrastructure/database/drizzle/client";
import ItemValueDrizzleRepository from "@server/infrastructure/database/drizzle/repositories/item_value.repository";
import StandardDrizzleRepository from "@server/infrastructure/database/drizzle/repositories/standard.repository";

interface Params {
  description: IStandard["description"];
  cashflow_type: TypeOfVariants;
  scheduled_at: IItemValue["scheduled_at"];
  amount: IItemValue["amount"];
  was_processed: IItemValue["was_processed"];
  tag: Tag;
  transfer_method: TransferMethod;
}

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