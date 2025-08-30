import FindRecurringPaymentById from "@core/use_cases/payment/recurring/find_by_id.use_case";
import { IRecurring, Recurring } from "@domain/entities/recurring.entity";
import { db } from "@server/infrastructure/database/drizzle/client";
import RecurringDrizzleRepository from "@server/infrastructure/database/drizzle/repositories/recurring.repository";

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
    
      const find_by_id = new FindRecurringPaymentById(repo);
    
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