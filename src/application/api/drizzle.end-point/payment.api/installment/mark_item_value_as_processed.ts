import { Installment } from "@src/core/entities/installment.entity";
import { ItemValue } from "@src/core/entities/item_value.entity";
import MarkInstallmentPaymentItemValueAsProcessed from "@src/core/use_cases/payment/installment/mark_item_value_as_processed.use_case";
import { db } from "@src/infrastructure/database/client";
import InstallmentDrizzleRepository from "@src/infrastructure/repositories/installment.repository";
import ItemValueDrizzleRepository from "@src/infrastructure/repositories/item_value.repository";
import { sql } from "drizzle-orm/sql";

interface Params {
  id: Installment["id"];
  item_value_id: ItemValue["id"]
}

async function mark_item_value_as_processed({
  id,
  item_value_id
}: Params): Promise<Installment | undefined> {
  db.run(sql.raw("BEGIN"))
  const repo = new InstallmentDrizzleRepository();
  const repo_iv = new ItemValueDrizzleRepository();

  const mark_item_value_as_processed = new MarkInstallmentPaymentItemValueAsProcessed(repo, repo_iv);

  const installment_processed = await mark_item_value_as_processed.execute({
    id,
    item_value_id
  })

  if (!installment_processed.success) {
    db.run(sql.raw("ROLLBACK"))
    return undefined;
  }

  db.run(sql.raw("COMMIT"))
  return installment_processed.data
}

export default mark_item_value_as_processed;