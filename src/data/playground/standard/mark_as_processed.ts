import { canBeModified } from "@data/playground/utils";
import * as iv from "@data_functions/item_value";
import * as std from "@data_functions/standard";
import { db, transactionsFn } from "@database/db-instance";
import { standard } from "@database/schema";

export async function mark_standard_as_processed(
  standard_id: typeof standard.$inferSelect.id
) {
  transactionsFn.begin();
  try {
    const standard_founded = await std.get(db, standard_id);
    if (standard_founded === undefined) {
      throw new Error(`Nenhuma transação padrão encontrada (${standard_founded})`);
    }

    if (!canBeModified(standard_founded.scheduled_at)) {
      throw new Error("Não é possível modificar itens de saldos fechados!")
    }

    await iv.mark_as_processed(db, standard_founded.item_value_id);

    transactionsFn.commit();
  } catch (error) {
    transactionsFn.rollback();
    throw error;
  }
}
