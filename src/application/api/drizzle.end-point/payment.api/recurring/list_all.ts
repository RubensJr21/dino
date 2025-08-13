import { Recurring } from "@src/core/entities/recurring.entity";
import ListAllRecurringsPayment from "@src/core/use_cases/payment/recurring/list_all.use_case";
import { db } from "@src/infrastructure/database/client";
import RecurringDrizzleRepository from "@src/infrastructure/repositories/recurring.repository";

type Return = Recurring[] | undefined

async function list_all(): Promise<Return> {
  let result: Return

  try {
    result = db.transaction<Return>((tx) => {
      const repo = new RecurringDrizzleRepository(tx);
      const list_all = new ListAllRecurringsPayment(repo);
    
      const list = list_all.execute()
    
      if (!list.success) {
        tx.rollback()
        return undefined;
      }
      
      return list.data;
    })
  } catch (error) {
    // TODO: Aqui eu popularia o erro
  }
  return result;

}

export default list_all;