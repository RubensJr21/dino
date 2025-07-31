import { Recurring } from "@src/core/entities/recurring.entity";
import ListAllRecurringsPayment from "@src/core/use_cases/payment/recurring/list_all.use_case";
import { db } from "@src/infrastructure/database/client";
import RecurringDrizzleRepository from "@src/infrastructure/repositories/recurring.repository";

async function list_all(): Promise<Recurring[] | undefined>{
  let list_payments_recurring: Recurring[] | undefined = undefined

  await db.transaction(async tx => {
      console.log("Buscando na transaction...")
      const repo = new RecurringDrizzleRepository(tx);
      const list_all = new ListAllRecurringsPayment(repo);
  
      const list = await list_all.execute()

      console.log("Busquei...")
      
      if(!list.success){
        tx.rollback();
        return;
      }
  
      list_payments_recurring = list.data
    })

  return list_payments_recurring
}

export default list_all;