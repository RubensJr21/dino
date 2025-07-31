import { Installment } from "@src/core/entities/installment.entity";
import { ItemValue } from "@src/core/entities/item_value.entity";
import ListAllItemValueInstallmentPayments from "@src/core/use_cases/payment/installment/list_all_items.use_case";
import { db } from "@src/infrastructure/database/client";
import InstallmentDrizzleRepository from "@src/infrastructure/repositories/installment.repository";

interface Params {
  installment_id: Installment["id"]
}

async function list_all_items({
  installment_id
}: Params): Promise<ItemValue[] | undefined>{
  let list_payments_installment: ItemValue[] | undefined = undefined

  await db.transaction(async tx => {
      const repo = new InstallmentDrizzleRepository(tx);
      const list_all = new ListAllItemValueInstallmentPayments(repo);
  
      const list = await list_all.execute({
        installment_id
      })
      
      if(!list.success){
        tx.rollback();
        return;
      }
  
      list_payments_installment = list.data
    })

  return list_payments_installment
}

export default list_all_items;