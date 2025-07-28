import { IRecurring } from "@src/core/entities/recurring.entity";
import DeleteRecurringPayment from "@src/core/use_cases/payment/recurring/delete.use_case";
import { db } from "@src/infrastructure/database/client";
import RecurringDrizzleRepository from "@src/infrastructure/repositories/recurring.repository";

interface Params {
  id: IRecurring["id"]
}

async function delete_recurring({
  id
}: Params): Promise<boolean> {
  let last_recurring_modified: boolean = false;
  
  await db.transaction(async tx => {
    const repo = new RecurringDrizzleRepository(tx);
    const delete_recurring = new DeleteRecurringPayment(repo);

    const recurring_deleted = await delete_recurring.execute({id})

    if(!recurring_deleted.success){
      tx.rollback();
      return;
    }

    last_recurring_modified = true
  })
  
  return last_recurring_modified;
}

export default delete_recurring;