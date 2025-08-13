import { IRecurring } from "@src/core/entities/recurring.entity";
import DeleteRecurringReceipt from "@src/core/use_cases/receipt/recurring/delete.use_case";
import { db } from "@src/infrastructure/database/client";
import RecurringDrizzleRepository from "@src/infrastructure/repositories/recurring.repository";

interface Params {
  id: IRecurring["id"]
}

type Return = boolean | undefined

async function delete_recurring({
  id
}: Params): Promise<boolean | undefined> {
  let result: Return

  try {
    result = db.transaction<Return>((tx) => {
      const repo = new RecurringDrizzleRepository(tx);
      const delete_recurring = new DeleteRecurringReceipt(repo);

      const recurring_deleted = delete_recurring.execute({ id })

      if (!recurring_deleted.success) {
        tx.rollback();
        return undefined;
      }

      return true
    })
  } catch (error) {
    // TODO: Aqui eu popularia o erro
  }
  return result;
}

export default delete_recurring;