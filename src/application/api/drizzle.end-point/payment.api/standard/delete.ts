import { IStandard } from "@src/core/entities/standard.entity";
import DeletePaymentStandard from "@src/core/use_cases/payment/standard/delete.use_case";
import { db } from "@src/infrastructure/database/client";
import ItemValueDrizzleRepository from "@src/infrastructure/repositories/item_value.repository";
import StandardDrizzleRepository from "@src/infrastructure/repositories/standard.repository";

interface Params {
  id: IStandard["id"];
}

type Return = boolean | undefined

async function delete_standard({
  id
}: Params): Promise<Return> {
  let result: Return

  try {
    result = db.transaction<Return>((tx) => {
      const repo = new StandardDrizzleRepository(tx);
      const repo_iv = new ItemValueDrizzleRepository(tx);
      const delete_standard = new DeletePaymentStandard(repo, repo_iv);

      const standard_deleted = delete_standard.execute({ id })

      if (!standard_deleted.success) {
        tx.rollback();
        return undefined;
      }

      return true
    })
  } catch (error) {
    // TODO: Aqui eu popularia o erro
  }
  return result;
}

export default delete_standard;