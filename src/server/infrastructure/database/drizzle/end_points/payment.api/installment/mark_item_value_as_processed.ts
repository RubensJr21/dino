import MarkInstallmentPaymentItemValueAsProcessed from "@core/use_cases/payment/installment/mark_item_value_as_processed.use_case";
import { Installment } from "@domain/entities/installment.entity";
import { ItemValue } from "@domain/entities/item_value.entity";
import { db } from "@server/infrastructure/database/drizzle/client";
import InstallmentDrizzleRepository from "@server/infrastructure/database/drizzle/repositories/installment.repository";
import ItemValueDrizzleRepository from "@server/infrastructure/database/drizzle/repositories/item_value.repository";

interface Params {
  id: Installment["id"];
  item_value_id: ItemValue["id"]
}

type Return = Installment | undefined

async function mark_item_value_as_processed({
  id,
  item_value_id
}: Params): Promise<Return> {
  let result: Return

  try {
    result = db.transaction<Return>((tx) => {
      const repo = new InstallmentDrizzleRepository(tx);
      const repo_iv = new ItemValueDrizzleRepository(tx);
    
      const mark_item_value_as_processed = new MarkInstallmentPaymentItemValueAsProcessed(repo, repo_iv);
    
      const installment_processed = mark_item_value_as_processed.execute({
        id,
        item_value_id
      })
    
      if (!installment_processed.success) {
        tx.rollback();
        return undefined;
      }
    
      return installment_processed.data
    })
  } catch (error) {
    // TODO: Aqui eu popularia o erro
  }
  return result;

}

export default mark_item_value_as_processed;