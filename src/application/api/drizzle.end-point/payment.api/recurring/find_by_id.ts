import { IRecurring, Recurring } from "@src/core/entities/recurring.entity";
import FindRecurringPaymentById from "@src/core/use_cases/payment/recurring/find_by_id.use_case";
import { db } from "@src/infrastructure/database/client";
import RecurringDrizzleRepository from "@src/infrastructure/repositories/recurring.repository";
import { sql } from "drizzle-orm/sql";

interface Params {
  id: IRecurring["id"]
}

async function find_by_id({
  id
}: Params): Promise<Recurring | undefined> {
  db.run(sql.raw("BEGIN"))
  const repo = new RecurringDrizzleRepository();

  const find_by_id = new FindRecurringPaymentById(repo);

  const recurring_founded = await find_by_id.execute({ id })

  if (!recurring_founded.success) {
    db.run(sql.raw("ROLLBACK"))
    return undefined;
  }

  db.run(sql.raw("COMMIT"))
  return recurring_founded.data
}

export default find_by_id;