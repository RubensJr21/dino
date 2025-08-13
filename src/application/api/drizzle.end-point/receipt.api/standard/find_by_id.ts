import { IStandard, Standard } from "@src/core/entities/standard.entity";
import FindStandardReceiptById from "@src/core/use_cases/receipt/standard/find_by_id.use_case";
import { db } from "@src/infrastructure/database/client";
import StandardDrizzleRepository from "@src/infrastructure/repositories/standard.repository";

interface Params {
  id: IStandard["id"]
}

type Return = Standard | undefined

async function find_by_id({
  id
}: Params): Promise<Return> {
  let result: Return

  try {
    result = db.transaction<Return>((tx) => {
      const repo = new StandardDrizzleRepository(tx);

      const find_by_id = new FindStandardReceiptById(repo);

      const standard_founded = find_by_id.execute({ id })

      if (!standard_founded.success) {
        tx.rollback()
        return undefined;
      }

      return standard_founded.data
    })
  } catch (error) {
    // TODO: Aqui eu popularia o erro
  }
  return result;
}

export default find_by_id;