import { Standard } from "@src/core/entities/standard.entity";
import ListAllStandardReceipts from "@src/core/use_cases/receipt/standard/list_all.use_case";
import { db } from "@src/infrastructure/database/client";
import StandardDrizzleRepository from "@src/infrastructure/repositories/standard.repository";

type Return = Standard[] | undefined

async function list_all(): Promise<Return> {
  let result: Return

  try {
    result = db.transaction<Return>((tx) => {
      const repo = new StandardDrizzleRepository(tx);
      const list_all = new ListAllStandardReceipts(repo);

      const list = list_all.execute()

      if (!list.success) {
        tx.rollback();
        return;
      }

      return list.data
    })
  } catch (error) {
    // TODO: Aqui eu popularia o erro
  }
  return result;

}

export default list_all;