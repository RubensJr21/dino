import { canBeModified } from "@data/playground/utils";
import * as iv from "@data_functions/item_value";
import * as rec from "@data_functions/recurring";
import { db, transactionsFn } from "@database/db-instance";
import { itemValue, recurring } from "@database/schema";

export async function mark_item_value_from_recurring_as_processed(
  recurring_id: typeof recurring.$inferSelect.id,
  item_value_id: typeof itemValue.$inferSelect.id
) {
  transactionsFn.begin();
  try {
    const recurring_founded = await rec.get(db, recurring_id);
    if (recurring_founded === undefined) {
      throw new Error(
        `Nenhuma transação parcelada encontrada (${recurring_founded})`
      );
    }

    if (!canBeModified(recurring_founded.start_date)) {
      throw new Error("Não é possível modificar itens de saldos fechados!")
    }

    const item_value = await rec.get_item_value(
      db,
      recurring_id,
      item_value_id
    );

    if (item_value === undefined) {
      throw new Error(`Nenhum valor de parcela encontrado (${item_value})`);
    }

    await iv.mark_as_unprocessed(db, item_value.id);

    transactionsFn.commit()
  } catch (error) {
    transactionsFn.rollback()
    throw error;
  }
}
