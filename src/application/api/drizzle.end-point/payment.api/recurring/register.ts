import { Recurring } from "@src/core/entities/recurring.entity";
import { CreateRecurringParams } from "@src/core/shared/interfaces/IRepoRecurring";
import RegisterRecurringPayment from "@src/core/use_cases/payment/recurring/register.use_case";
import { db } from "@src/infrastructure/database/client";
import ItemValueDrizzleRepository from "@src/infrastructure/repositories/item_value.repository";
import RecurringDrizzleRepository from "@src/infrastructure/repositories/recurring.repository";

type Params = CreateRecurringParams

async function register({
  ...params
}: Params): Promise<Recurring | undefined> {
  console.log("tentando registrar...")
  let last_recurring_created: Recurring | undefined = undefined;

  await db.transaction(async tx => {
    console.log("dentro da transaction")
    const repo = new RecurringDrizzleRepository(tx);
    const repo_iv = new ItemValueDrizzleRepository(tx);
    console.log("instanciei os repositories")
    
    const register_recurring = new RegisterRecurringPayment(repo, repo_iv);

    console.log("instanciei o caso de uso")

    const recurring_created = await register_recurring.execute(params)

    console.log("chamei caso de uso")

    if (!recurring_created.success) {
      tx.rollback();
      return;
    }

    last_recurring_created = recurring_created.data;
  })

  return last_recurring_created;
}

export default register;