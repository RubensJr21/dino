import { Installment } from "@src/core/entities/installment.entity";
import { ItemValue } from "@src/core/entities/item_value.entity";
import MarkInstallmentReceiptItemValueAsProcessed from "@src/core/use_cases/receipt/installment/mark_item_value_as_processed.use_case";
import { db } from "@src/infrastructure/database/client";
import InstallmentDrizzleRepository from "@src/infrastructure/repositories/installment.repository";
import ItemValueDrizzleRepository from "@src/infrastructure/repositories/item_value.repository";

interface Params {
  id: Installment["id"];
  item_value_id: ItemValue["id"]
}

async function mark_item_value_as_processed({
  id,
  item_value_id
}: Params): Promise<Installment | undefined> {
  let last_installment_modified: Installment | undefined = undefined;

  await db.transaction(async tx => {
    const repo = new InstallmentDrizzleRepository(tx);
    const repo_iv = new ItemValueDrizzleRepository(tx);

    const mark_item_value_as_processed = new MarkInstallmentReceiptItemValueAsProcessed(repo, repo_iv);

    const installment_processed = await mark_item_value_as_processed.execute({
      id,
      item_value_id
    })

    if(!installment_processed.success){
      tx.rollback()
      return;
    }

    last_installment_modified = installment_processed.data
  })

  return last_installment_modified;
}

export default mark_item_value_as_processed;