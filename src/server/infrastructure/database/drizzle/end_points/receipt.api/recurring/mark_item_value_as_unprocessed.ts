import MarkRecurringReceiptItemValueAsUnProcessed from "@core/use_cases/receipt/recurring/mark_item_value_as_unprocessed.use_case";
import { ItemValue } from "@domain/entities/item_value.entity";
import { Recurring } from "@domain/entities/recurring.entity";
import { db } from "@server/infrastructure/database/drizzle/client";
import ItemValueDrizzleRepository from "@server/infrastructure/database/drizzle/repositories/item_value.repository";
import RecurringDrizzleRepository from "@server/infrastructure/database/drizzle/repositories/recurring.repository";

interface Params {
  id: Recurring["id"];
  item_value_id: ItemValue["id"]
}

type Return = Recurring | undefined

async function mark_item_value_as_unprocessed({
  id,
  item_value_id
}: Params): Promise<Return> {
  let result: Return

  try {
    result = db.transaction<Return>((tx) => {
      const repo = new RecurringDrizzleRepository(tx);
      const repo_iv = new ItemValueDrizzleRepository(tx);

      const mark_item_value_as_unprocessed = new MarkRecurringReceiptItemValueAsUnProcessed(repo, repo_iv);

      const recurring_unprocessed = mark_item_value_as_unprocessed.execute({
        id,
        item_value_id
      })

      if (!recurring_unprocessed.success) {
        tx.rollback()
        return;
      }

      return recurring_unprocessed.data
    })
  } catch (error) {
    // TODO: Aqui eu popularia o erro
  }
  return result;
}

export default mark_item_value_as_unprocessed;