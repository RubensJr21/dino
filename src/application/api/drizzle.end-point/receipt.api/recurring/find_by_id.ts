import { IRecurring, Recurring } from "@src/core/entities/recurring.entity";
import FindRecurringReceiptById from "@src/core/use_cases/receipt/recurring/find_by_id.use_case";
import { db } from "@src/infrastructure/database/client";
import RecurringDrizzleRepository from "@src/infrastructure/repositories/recurring.repository";

interface Params {
  id: IRecurring["id"]
}

type Return = Recurring | undefined

async function find_by_id({
  id
}: Params): Promise<Return> {
  let result: Return

  try {
    result = db.transaction<Return>((tx) => {
      const repo = new RecurringDrizzleRepository(tx);
    
      const find_by_id = new FindRecurringReceiptById(repo);
    
      const recurring_founded = find_by_id.execute({ id })
    
      if (!recurring_founded.success) {
        tx.rollback();
        return undefined;
      }
      
      return recurring_founded.data
    })
  } catch (error) {
    // TODO: Aqui eu popularia o erro
  }
  return result;
}

export default find_by_id;