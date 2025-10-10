import { canBeModified } from "@data/playground/utils";
import * as iv from "@data_functions/item_value";
import { db, transactionsFn } from "@database/db-instance";
import { itemValue } from "@database/schema";

export async function mark_item_value_as_unprocessed(
  item_value_id: typeof itemValue.$inferSelect.id
) {
  transactionsFn.begin();
  try {
    const item_value_founded = await iv.get(db, item_value_id);
    if (item_value_founded === undefined) {
      throw new Error(
        `Nenhuma item_value com o id ${item_value_id} foi encontrada (${item_value_founded})`
      );
    }

    if (!canBeModified(item_value_founded.scheduled_at)) {
      throw new Error("Não é possível modificar itens de saldos fechados!")
    }

    await iv.mark_as_unprocessed(db, item_value_founded.id);

    transactionsFn.commit()
  } catch (error) {
    transactionsFn.rollback()
    throw error;
  }
}
