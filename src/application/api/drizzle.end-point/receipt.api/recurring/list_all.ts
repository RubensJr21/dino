import { Recurring } from "@src/core/entities/recurring.entity";
import ListAllRecurringsReceipt from "@src/core/use_cases/receipt/recurring/list_all.use_case";
import { db } from "@src/infrastructure/database/client";
import RecurringDrizzleRepository from "@src/infrastructure/repositories/recurring.repository";
import { sql } from "drizzle-orm/sql";

async function delete_recurring(): Promise<Recurring[] | undefined> {
  db.run(sql.raw("BEGIN"))
  const repo = new RecurringDrizzleRepository();
  const list_all = new ListAllRecurringsReceipt(repo);

  const list = await list_all.execute()

  if (!list.success) {
    db.run(sql.raw("ROLLBACK"));
    return undefined;
  }

  db.run(sql.raw("COMMIT"))
  return list.data
}

export default delete_recurring;