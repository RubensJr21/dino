import { IRecurring, Recurring } from "@src/core/entities/recurring.entity";
import FindRecurringReceiptById from "@src/core/use_cases/receipt/recurring/find_by_id.use_case";
import { db } from "@src/infrastructure/database/client";
import RecurringDrizzleRepository from "@src/infrastructure/repositories/recurring.repository";

interface Params {
  id: IRecurring["id"]
}

async function find_by_id({
  id
}: Params): Promise<Recurring | undefined> {
  let last_recurring_founded: Recurring | undefined = undefined;
  
    await db.transaction(async tx => {
      const repo = new RecurringDrizzleRepository(tx);

      const find_by_id = new FindRecurringReceiptById(repo);
  
      const recurring_founded = await find_by_id.execute({id})
  
      if(!recurring_founded.success){
        tx.rollback()
        return;
      }
      
      last_recurring_founded = recurring_founded.data
    })
  
    return last_recurring_founded;
}

export default find_by_id;