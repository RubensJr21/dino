import { Installment } from "@src/core/entities/installment.entity";
import { ItemValue } from "@src/core/entities/item_value.entity";
import ListAllItemValueInstallmentPayments from "@src/core/use_cases/payment/installment/list_all_items.use_case";
import { db } from "@src/infrastructure/database/client";
import InstallmentDrizzleRepository from "@src/infrastructure/repositories/installment.repository";

interface Params {
  installment_id: Installment["id"]
}

type Return = ItemValue[] | undefined

async function list_all_items({
  installment_id
}: Params): Promise<ItemValue[] | undefined> {
  let result: Return

  try {
    result = db.transaction<Return>((tx) => {
      const repo = new InstallmentDrizzleRepository(tx);
      const list_all = new ListAllItemValueInstallmentPayments(repo);
    
      const list = list_all.execute({
        installment_id
      })
    
      if (!list.success) {
        tx.rollback();
        return;
      }
    
      return list.data
    })
  } catch (error) {
    // TODO: Aqui eu popularia o erro
  }
  return result;
}

export default list_all_items;