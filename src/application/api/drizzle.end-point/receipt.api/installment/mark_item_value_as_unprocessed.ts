import { Installment } from "@src/core/entities/installment.entity";
import { ItemValue } from "@src/core/entities/item_value.entity";
import MarkInstallmentReceiptItemValueAsUnProcessed from "@src/core/use_cases/receipt/installment/mark_item_value_as_unprocessed.use_case";
import { db } from "@src/infrastructure/database/client";
import InstallmentDrizzleRepository from "@src/infrastructure/repositories/installment.repository";
import ItemValueDrizzleRepository from "@src/infrastructure/repositories/item_value.repository";
import { sql } from "drizzle-orm/sql";

interface Params {
  id: Installment["id"];
  item_value_id: ItemValue["id"]
}

async function mark_item_value_as_unprocessed({
  id,
  item_value_id
}: Params): Promise<Installment | undefined> {
  db.run(sql.raw("BEGIN"))
  const repo = new InstallmentDrizzleRepository();
  const repo_iv = new ItemValueDrizzleRepository();

  const mark_item_value_as_unprocessed = new MarkInstallmentReceiptItemValueAsUnProcessed(repo, repo_iv);

  const installment_unprocessed = await mark_item_value_as_unprocessed.execute({
    id,
    item_value_id
  })

  if (!installment_unprocessed.success) {
    db.run(sql.raw("ROLLBACK"))
    return undefined;
  }

  db.run(sql.raw("COMMIT"))
  return installment_unprocessed.data
}

export default mark_item_value_as_unprocessed;