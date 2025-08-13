import { IStandard, Standard } from "@src/core/entities/standard.entity";
import { MItemValue } from "@src/core/models/item_value.model";
import UpdateStandardPayment from "@src/core/use_cases/payment/standard/update.use_case";
import { db } from "@src/infrastructure/database/client";
import ItemValueDrizzleRepository from "@src/infrastructure/repositories/item_value.repository";
import StandardDrizzleRepository from "@src/infrastructure/repositories/standard.repository";

interface Params {
  id: IStandard["id"];
  data_item_value: StrictOmit<MItemValue, "id">
}

type Return = Standard | undefined

async function update({
  id,
  data_item_value
}: Params): Promise<Return> {
  let result: Return

  try {
    result = db.transaction<Return>((tx) => {
      const repo = new StandardDrizzleRepository(tx);
      const repo_iv = new ItemValueDrizzleRepository(tx);
      const update_standard = new UpdateStandardPayment(repo, repo_iv);

      const standard_edited = update_standard.execute({
        id,
        data_item_value
      })

      if (!standard_edited.success) {
        tx.rollback();
        return undefined;
      }

      return standard_edited.data;
    })
  } catch (error) {
    // TODO: Aqui eu popularia o erro
  }
  return result;
}

export default update;