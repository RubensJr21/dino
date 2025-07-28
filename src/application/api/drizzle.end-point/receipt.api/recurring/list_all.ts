import { Recurring } from "@src/core/entities/recurring.entity";
import ListAllRecurringsReceipt from "@src/core/use_cases/receipt/recurring/list_all.use_case";
import { db } from "@src/infrastructure/database/client";
import RecurringDrizzleRepository from "@src/infrastructure/repositories/recurring.repository";

async function delete_recurring(): Promise<Recurring[] | undefined>{
  let list_receipts_recurring: Recurring[] | undefined = undefined

  await db.transaction(async tx => {
      const repo = new RecurringDrizzleRepository(tx);
      const list_all = new ListAllRecurringsReceipt(repo);
  
      const list = await list_all.execute()
      
      if(!list.success){
        tx.rollback();
        return;
      }
  
      list_receipts_recurring = list.data
    })

  return list_receipts_recurring
}

export default delete_recurring;