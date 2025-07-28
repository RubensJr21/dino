import { Recurring } from "@src/core/entities/recurring.entity";
import { CreateRecurringParams } from "@src/core/shared/interfaces/IRepoRecurring";
import RegisterRecurringReceipt from "@src/core/use_cases/receipt/recurring/register.use_case";
import { db } from "@src/infrastructure/database/client";
import ItemValueDrizzleRepository from "@src/infrastructure/repositories/item_value.repository";
import RecurringDrizzleRepository from "@src/infrastructure/repositories/recurring.repository";

type Params = CreateRecurringParams

async function register({
  ...params
}: Params): Promise<Recurring | undefined> {
  let last_recurring_created: Recurring | undefined = undefined;

  await db.transaction(async tx => {
    const repo = new RecurringDrizzleRepository(tx);
    const repo_iv = new ItemValueDrizzleRepository(tx);
    
    const register_recurring = new RegisterRecurringReceipt(repo, repo_iv);

    const recurring_created = await register_recurring.execute(params)

    if (!recurring_created.success) {
      tx.rollback();
      return;
    }

    last_recurring_created = recurring_created.data;
  })

  return last_recurring_created;
}

export default register;