import { IRecurring, Recurring } from "@src/core/entities/recurring.entity";
import UpdateCurrentRecurringAmountPayment from "@src/core/use_cases/payment/recurring/update_current_amount.use_case";
import { db } from "@src/infrastructure/database/client";
import RecurringDrizzleRepository from "@src/infrastructure/repositories/recurring.repository";

interface Params {
  id: IRecurring["id"];
  data: {
    current_amount: IRecurring["current_amount"]
  }
}

type Return = Recurring | undefined

async function edit({
  id,
  data
}: Params): Promise<Return> {
  let result: Return

  try {
    result = db.transaction<Return>((tx) => {
      const repo = new RecurringDrizzleRepository(tx);
      const update_installment = new UpdateCurrentRecurringAmountPayment(repo);

      const installment_edited = update_installment.execute({
        id,
        current_amount: data.current_amount
      })

      if (!installment_edited.success) {
        tx.rollback();
        return undefined;
      }

      return installment_edited.data;
    })
  } catch (error) {
    // TODO: Aqui eu popularia o erro
  }
  return result;
}

export default edit;