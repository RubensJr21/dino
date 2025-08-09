import { Installment } from "@src/core/entities/installment.entity";
import { ItemValue } from "@src/core/entities/item_value.entity";
import ListAllItemValueInstallmentPayments from "@src/core/use_cases/payment/installment/list_all_items.use_case";
import { db } from "@src/infrastructure/database/client";
import InstallmentDrizzleRepository from "@src/infrastructure/repositories/installment.repository";
import { sql } from "drizzle-orm/sql";

interface Params {
  installment_id: Installment["id"]
}

async function list_all_items({
  installment_id
}: Params): Promise<ItemValue[] | undefined> {
  db.run(sql.raw("BEGIN"))
  const repo = new InstallmentDrizzleRepository();
  const list_all = new ListAllItemValueInstallmentPayments(repo);

  const list = await list_all.execute({
    installment_id
  })

  if (!list.success) {
    db.run(sql.raw("ROLLBACK"));
    return;
  }

  db.run(sql.raw("COMMIT"))
  return list.data
}

export default list_all_items;