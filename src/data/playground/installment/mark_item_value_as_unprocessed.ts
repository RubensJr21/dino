import { canBeModified } from "@data/playground/utils";
import * as imt from "@data_functions/installment";
import * as iv from "@data_functions/item_value";
import { db, transactionsFn } from "@database/db-instance";
import { installment, itemValue } from "@database/schema";

export async function mark_item_value_installment_as_processed(
  installment_id: typeof installment.$inferSelect.id,
  item_value_id: typeof itemValue.$inferSelect.id
) {
  transactionsFn.begin();
  try {
    const installment_founded = await imt.get(db, installment_id);
    if (installment_founded === undefined) {
      throw new Error(
        `Nenhuma transação parcelada encontrada (${installment_founded})`
      );
    }

    if (!canBeModified(installment_founded.start_date)) {
      throw new Error("Não é possível modificar itens de saldos fechados!")
    }

    const item_value = await imt.get_item_value(
      db,
      installment_id,
      item_value_id
    );

    if (item_value === undefined) {
      throw new Error(`Nenhum valor de parcela encontrado (${item_value})`);
    }

    await iv.mark_as_unprocessed(db, item_value.id);

    transactionsFn.commit();
    console.log("item value marcado como não processado!");
  } catch (error) {
    transactionsFn.rollback();
    throw error;
  }
}
