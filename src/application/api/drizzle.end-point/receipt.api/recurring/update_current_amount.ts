import { IRecurring, Recurring } from "@src/core/entities/recurring.entity";
import UpdateCurrentRecurringAmountReceipt from "@src/core/use_cases/receipt/recurring/update_current_amount.use_case";
import { db } from "@src/infrastructure/database/client";
import RecurringDrizzleRepository from "@src/infrastructure/repositories/recurring.repository";

interface Params {
  id: IRecurring["id"];
  data: {
    current_amount: IRecurring["current_amount"]
  }
}

async function edit({
  id,
  data
}: Params): Promise<Recurring | undefined> {
  let last_installment_edited: Recurring | undefined = undefined;

  await db.transaction(async tx => {
    const repo = new RecurringDrizzleRepository(tx);
    const update_installment = new UpdateCurrentRecurringAmountReceipt(repo);

    const installment_edited = await update_installment.execute({
      id,
      current_amount: data.current_amount
    })

    if(!installment_edited.success){
      tx.rollback();
      return;
    }

    last_installment_edited = installment_edited.data;

  })

  return last_installment_edited
}

export default edit;