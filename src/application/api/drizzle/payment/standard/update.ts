import { Standard } from "@src/core/entities/standard.entity";
import { MItemValue } from "@src/core/models/item_value.model";
import IEntityBase from "@src/core/shared/interfaces/IEntityBase";
import UpdatePaymentStandard from "@src/core/use_cases/payment/standard/update.use_case";
import { db } from "@src/infrastructure/database/client";
import ItemValueDrizzleRepository from "@src/infrastructure/repositories/item_value.repository";
import StandardDrizzleRepository from "@src/infrastructure/repositories/standard.repository";

interface Params {
  id: IEntityBase["id"];
  data_item_value: StrictOmit<MItemValue, "id">
}

async function update({
  id,
  data_item_value
}: Params): Promise<Standard | undefined> {
  let last_standard_created: Standard | undefined = undefined;
  await db.transaction(async tx => {
    const repo = new StandardDrizzleRepository(tx);
    const repo_iv = new ItemValueDrizzleRepository(tx);
    const update_standard = new UpdatePaymentStandard(repo, repo_iv);

    const standard_created = await update_standard.execute({
      id,
      data_item_value
    })

    if(!standard_created.success){
      tx.rollback();
      return;
    }

    last_standard_created = standard_created.data;
  })
  return last_standard_created;
}

export default update;