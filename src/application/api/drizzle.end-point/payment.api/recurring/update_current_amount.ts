import { IRecurring, Recurring } from "@src/core/entities/recurring.entity";
import UpdateCurrentRecurringAmountPayment from "@src/core/use_cases/payment/recurring/update_current_amount.use_case";
import { db } from "@src/infrastructure/database/client";
import RecurringDrizzleRepository from "@src/infrastructure/repositories/recurring.repository";
import { sql } from "drizzle-orm/sql";

interface Params {
  id: IRecurring["id"];
  data: {
    current_amount: IRecurring["current_amount"]
  }
}

async function edit({
  id,
  data
}: Params): Promise<Recurring | undefined> {
  db.run(sql.raw("BEGIN"))
  const repo = new RecurringDrizzleRepository();
  const update_installment = new UpdateCurrentRecurringAmountPayment(repo);

  const installment_edited = await update_installment.execute({
    id,
    current_amount: data.current_amount
  })

  if (!installment_edited.success) {
    db.run(sql.raw("ROLLBACK"));
    return undefined;
  }

  db.run(sql.raw("COMMIT"))
  return installment_edited.data;
}

export default edit;