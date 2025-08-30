import { MItemValue } from "@core/models/item_value.model";
import UpdateStandardPayment from "@core/use_cases/payment/standard/update.use_case";
import { IStandard, Standard } from "@domain/entities/standard.entity";
import { db } from "@server/infrastructure/database/drizzle/client";
import ItemValueDrizzleRepository from "@server/infrastructure/database/drizzle/repositories/item_value.repository";
import StandardDrizzleRepository from "@server/infrastructure/database/drizzle/repositories/standard.repository";

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