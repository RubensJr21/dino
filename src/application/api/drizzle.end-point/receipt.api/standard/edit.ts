import { IStandard, Standard } from "@src/core/entities/standard.entity";
import { MItemValue } from "@src/core/models/item_value.model";
import UpdateStandardReceipt from "@src/core/use_cases/receipt/standard/update.use_case";
import { db } from "@src/infrastructure/database/client";
import ItemValueDrizzleRepository from "@src/infrastructure/repositories/item_value.repository";
import StandardDrizzleRepository from "@src/infrastructure/repositories/standard.repository";

interface Params {
  id: IStandard["id"];
  data_item_value: StrictOmit<MItemValue, "id">
}

async function update({
  id,
  data_item_value
}: Params): Promise<Standard | undefined> {
  let last_standard_edited: Standard | undefined = undefined;
  await db.transaction(async tx => {
    const repo = new StandardDrizzleRepository(tx);
    const repo_iv = new ItemValueDrizzleRepository(tx);
    const update_standard = new UpdateStandardReceipt(repo, repo_iv);

    const standard_edited = await update_standard.execute({
      id,
      data_item_value
    })

    if(!standard_edited.success){
      tx.rollback();
      return;
    }

    last_standard_edited = standard_edited.data;
  })
  return last_standard_edited;
}

export default update;