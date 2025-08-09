import { ItemValue } from "@src/core/entities/item_value.entity";
import { Recurring } from "@src/core/entities/recurring.entity";
import ListAllRecurringItemValuePayments from "@src/core/use_cases/payment/recurring/list_all_items.use_case";
import { db } from "@src/infrastructure/database/client";
import RecurringDrizzleRepository from "@src/infrastructure/repositories/recurring.repository";
import { sql } from "drizzle-orm/sql";

interface Params {
  recurring_id: Recurring["id"]
}

async function list_all_items({
  recurring_id
}: Params): Promise<ItemValue[] | undefined> {
  db.run(sql.raw("BEGIN"))
  const repo = new RecurringDrizzleRepository();
  const list_all_items = new ListAllRecurringItemValuePayments(repo);

  const list = await list_all_items.execute({
    recurring_id
  })

  if (!list.success) {
    db.run(sql.raw("ROLLBACK"));
    return undefined;
  }

  db.run(sql.raw("COMMIT"))
  return list.data
}

export default list_all_items;