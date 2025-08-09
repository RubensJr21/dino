import { Recurring } from "@src/core/entities/recurring.entity";
import ListAllRecurringsPayment from "@src/core/use_cases/payment/recurring/list_all.use_case";
import { db } from "@src/infrastructure/database/client";
import RecurringDrizzleRepository from "@src/infrastructure/repositories/recurring.repository";
import { sql } from "drizzle-orm";

async function list_all(): Promise<Recurring[] | undefined> {
  db.run(sql.raw("BEGIN"))

  const repo = new RecurringDrizzleRepository();
  const list_all = new ListAllRecurringsPayment(repo);

  const list = await list_all.execute()

  if (!list.success) {
    db.run(sql.raw("ROLLBACK"))
    return undefined;
  }

  db.run(sql.raw("COMMIT"))
  return list.data;
}

export default list_all;

(function (){
  db.run(sql.raw("BEGIN"))
  db.run(sql.raw("ROLLBACK"))
  db.run(sql.raw("COMMIT"))
})