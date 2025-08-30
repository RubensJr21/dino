import ListAllStandardPayments from "@core/use_cases/payment/standard/list_all.use_case";
import { Standard } from "@domain/entities/standard.entity";
import { db } from "@server/infrastructure/database/drizzle/client";
import StandardDrizzleRepository from "@server/infrastructure/database/drizzle/repositories/standard.repository";

type Return = Standard[] | undefined

async function list_all(): Promise<Return> {
  let result: Return

  try {
    result = db.transaction<Return>((tx) => {
      const repo = new StandardDrizzleRepository(tx);
      const list_all = new ListAllStandardPayments(repo);

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