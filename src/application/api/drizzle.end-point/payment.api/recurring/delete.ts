import { IRecurring } from "@src/core/entities/recurring.entity";
import DeleteRecurringPayment from "@src/core/use_cases/payment/recurring/delete.use_case";
import { db } from "@src/infrastructure/database/client";
import RecurringDrizzleRepository from "@src/infrastructure/repositories/recurring.repository";
import { sql } from "drizzle-orm/sql";

interface Params {
  id: IRecurring["id"]
}

async function delete_recurring({
  id
}: Params): Promise<boolean | undefined> {
  db.run(sql.raw("BEGIN"))
  const repo = new RecurringDrizzleRepository();
  const delete_recurring = new DeleteRecurringPayment(repo);

  const recurring_deleted = await delete_recurring.execute({ id })

  if (!recurring_deleted.success) {
    db.run(sql.raw("ROLLBACK"));
    return undefined;
  }

  db.run(sql.raw("COMMIT"))
  return true
}

export default delete_recurring;