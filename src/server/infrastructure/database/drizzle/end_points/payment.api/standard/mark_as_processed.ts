import MarkStandardPaymentAsProcessed from "@core/use_cases/payment/standard/mark_as_processed.use_case";
import { IStandard, Standard } from "@domain/entities/standard.entity";
import { db } from "@server/infrastructure/database/drizzle/client";
import ItemValueDrizzleRepository from "@server/infrastructure/database/drizzle/repositories/item_value.repository";
import StandardDrizzleRepository from "@server/infrastructure/database/drizzle/repositories/standard.repository";

interface Params {
  id: IStandard["id"]
}

type Return = Standard | undefined

async function mark_as_processed({
  id
}: Params): Promise<Return> {
  let result: Return

  try {
    result = db.transaction<Return>((tx) => {
      const repo = new StandardDrizzleRepository(tx);
      const repo_iv = new ItemValueDrizzleRepository(tx);
      const mark_as_processed = new MarkStandardPaymentAsProcessed(repo, repo_iv);

      const standard_processed = mark_as_processed.execute({ id })

      if (!standard_processed.success) {
        tx.rollback()
        return undefined;
      }

      return standard_processed.data;
    })
  } catch (error) {
    // TODO: Aqui eu popularia o erro
  }
  return result;

}

export default mark_as_processed;