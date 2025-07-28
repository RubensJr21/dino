import { ItemValue } from "@src/core/entities/item_value.entity";
import { Recurring } from "@src/core/entities/recurring.entity";
import MarkRecurringPaymentItemValueAsProcessed from "@src/core/use_cases/payment/recurring/mark_item_value_as_processed.use_case";
import { db } from "@src/infrastructure/database/client";
import ItemValueDrizzleRepository from "@src/infrastructure/repositories/item_value.repository";
import RecurringDrizzleRepository from "@src/infrastructure/repositories/recurring.repository";

interface Params {
  id: Recurring["id"];
  item_value_id: ItemValue["id"]
}

async function mark_item_value_as_processed({
  id,
  item_value_id
}: Params): Promise<Recurring | undefined> {
  let last_recurring_modified: Recurring | undefined = undefined;

  await db.transaction(async tx => {
    const repo = new RecurringDrizzleRepository(tx);
    const repo_iv = new ItemValueDrizzleRepository(tx);

    const mark_item_value_as_processed = new MarkRecurringPaymentItemValueAsProcessed(repo, repo_iv);

    const recurring_processed = await mark_item_value_as_processed.execute({
      id,
      item_value_id
    })

    if(!recurring_processed.success){
      tx.rollback()
      return;
    }

    last_recurring_modified = recurring_processed.data
  })

  return last_recurring_modified;
}

export default mark_item_value_as_processed;