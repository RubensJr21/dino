import { ItemValue } from "@src/core/entities/item_value.entity";
import { Recurring } from "@src/core/entities/recurring.entity";
import MarkRecurringPaymentItemValueAsUnProcessed from "@src/core/use_cases/payment/recurring/mark_item_value_as_unprocessed.use_case";
import { db } from "@src/infrastructure/database/client";
import ItemValueDrizzleRepository from "@src/infrastructure/repositories/item_value.repository";
import RecurringDrizzleRepository from "@src/infrastructure/repositories/recurring.repository";
import { sql } from "drizzle-orm";

interface Params {
  id: Recurring["id"];
  item_value_id: ItemValue["id"]
}

async function mark_item_value_as_unprocessed({
  id,
  item_value_id
}: Params): Promise<Recurring | undefined> {
  db.run(sql.raw("BEGIN"))
  const repo = new RecurringDrizzleRepository();
  const repo_iv = new ItemValueDrizzleRepository();

  const mark_item_value_as_unprocessed = new MarkRecurringPaymentItemValueAsUnProcessed(repo, repo_iv);

  const recurring_unprocessed = await mark_item_value_as_unprocessed.execute({
    id,
    item_value_id
  })

  if (!recurring_unprocessed.success) {
    db.run(sql.raw("ROLLBACK"))
    return;
  }

  db.run(sql.raw("COMMIT"))
  return recurring_unprocessed.data
}

export default mark_item_value_as_unprocessed;