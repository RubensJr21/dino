/*
-- ======================
-- TABELA: installment
-- ======================
*/

import { canBeModified } from "@data/playground/utils";
import * as btt from "@data_functions/base_transaction_type";
import * as imt from "@data_functions/installment";
import * as iv from "@data_functions/item_value";
import { db, transactionsFn } from "@database/db-instance";
import { installment } from "@database/schema";

export const delete_recurring = async (
  installment_id: typeof installment.$inferSelect.id
) => {
  transactionsFn.begin();
  try {
    const installment_for_delete = await imt.get(db, installment_id);
    if (installment_for_delete === undefined) {
      throw new Error("installment_id inexistente.");
    }

    if (!canBeModified(installment_for_delete.start_date)) {
      throw new Error("Não é possível modificar itens de saldos fechados!")
    }

    await imt.remove(db, installment_for_delete.id);
    await btt.remove(db, installment_for_delete.id);
    const item_values = await imt.get_all_item_values(
      db,
      installment_for_delete.id
    );

    if (item_values.length === 0) {
      throw new Error(
        "Nenhum item valor foi encontrado para essa transação parcelada."
      );
    }

    await iv.remove(
      db,
      item_values.map(({ id }) => id) as [
        iv.infer_select["id"],
        ...iv.infer_select["id"][]
      ]
    );

    transactionsFn.commit();
    console.log("installment removido!");
  } catch (error) {
    transactionsFn.rollback();
    throw error;
  }
};
