import { ItemValue } from "@src/core/entities/item_value.entity";
import { Recurring } from "@src/core/entities/recurring.entity";
import ListAllRecurringItemValuePayments from "@src/core/use_cases/payment/recurring/list_all_items.use_case";
import { db } from "@src/infrastructure/database/client";
import RecurringDrizzleRepository from "@src/infrastructure/repositories/recurring.repository";

interface Params {
  recurring_id: Recurring["id"]
}

async function list_all_items({
  recurring_id
}: Params): Promise<ItemValue[] | undefined>{
  let list_payments_recurring: ItemValue[] | undefined = undefined

  await db.transaction(async tx => {
      const repo = new RecurringDrizzleRepository(tx);
      const list_all_items = new ListAllRecurringItemValuePayments(repo);
  
      const list = await list_all_items.execute({
        recurring_id
      })
      
      if(!list.success){
        tx.rollback();
        return;
      }
  
      list_payments_recurring = list.data
    })

  return list_payments_recurring
}

export default list_all_items;