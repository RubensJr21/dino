import ListAllRecurringItemValuePayments from "@core/use_cases/payment/recurring/list_all_items.use_case";
import { ItemValue } from "@domain/entities/item_value.entity";
import { Recurring } from "@domain/entities/recurring.entity";
import { db } from "@server/infrastructure/database/drizzle/client";
import RecurringDrizzleRepository from "@server/infrastructure/database/drizzle/repositories/recurring.repository";

interface Params {
  recurring_id: Recurring["id"]
}

type Return = ItemValue[] | undefined

async function list_all_items({
  recurring_id
}: Params): Promise<Return> {
  let result: Return

try {
  result = db.transaction<Return>((tx) => {
    const repo = new RecurringDrizzleRepository(tx);
    const list_all_items = new ListAllRecurringItemValuePayments(repo);
    
    const list = list_all_items.execute({
      recurring_id
    })
    
    if (!list.success) {
      tx.rollback()
      return undefined;
    }
    return list.data
  })
} catch (error) {
  // TODO: Aqui eu popularia o erro
}
return result;
}

export default list_all_items;