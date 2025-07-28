import { IStandard } from "@src/core/entities/standard.entity";
import DeletePaymentStandard from "@src/core/use_cases/payment/standard/delete.use_case";
import { db } from "@src/infrastructure/database/client";
import ItemValueDrizzleRepository from "@src/infrastructure/repositories/item_value.repository";
import StandardDrizzleRepository from "@src/infrastructure/repositories/standard.repository";

interface Params {
  id: IStandard["id"];
}

async function delete_standard({
  id
}: Params): Promise<boolean>{
  let last_standard_modified: boolean = false;
  await db.transaction(async tx => {
    const repo = new StandardDrizzleRepository(tx);
    const repo_iv = new ItemValueDrizzleRepository(tx);
    const delete_standard = new DeletePaymentStandard(repo, repo_iv);

    const standard_deleted = await delete_standard.execute({id})
    
    if(!standard_deleted.success){
      tx.rollback();
      return;
    }

    last_standard_modified = true
  });
  return last_standard_modified;
}

export default delete_standard;