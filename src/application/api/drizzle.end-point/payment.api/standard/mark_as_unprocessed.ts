import { IStandard, Standard } from "@src/core/entities/standard.entity";
import MarkStandardPaymentAsUnProcessed from "@src/core/use_cases/payment/standard/mark_as_unprocessed.use_case";
import { db } from "@src/infrastructure/database/client";
import ItemValueDrizzleRepository from "@src/infrastructure/repositories/item_value.repository";
import StandardDrizzleRepository from "@src/infrastructure/repositories/standard.repository";

interface Params {
  id: IStandard["id"]
}

async function mark_as_unprocessed({
  id
}: Params): Promise<Standard | undefined> {
  let last_standard_modified: Standard | undefined = undefined

  await db.transaction(async tx => {
    const repo = new StandardDrizzleRepository(tx);
    const repo_iv = new ItemValueDrizzleRepository(tx);
    const mark_as_unprocessed = new MarkStandardPaymentAsUnProcessed(repo, repo_iv);

    const standard_processed = await mark_as_unprocessed.execute({id})

    if(!standard_processed.success){
      tx.rollback()
      return;
    }

    last_standard_modified = standard_processed.data
  })

  return last_standard_modified;
}

export default mark_as_unprocessed;