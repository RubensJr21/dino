import { canBeModified } from "@data/playground/utils";
import * as iv from "@data_functions/item_value";
import * as imt from "@data_functions/recurring";
import { db, transactionsFn } from "@database/db-instance";
import { itemValue, recurring } from "@database/schema";

export async function mark_item_value_from_recurring_as_processed(
  recurring_id: typeof recurring.$inferSelect.id,
  item_value_id: typeof itemValue.$inferSelect.id
) {
  transactionsFn.begin();
  try {
    const recurring_founded = await imt.get(db, recurring_id);
    if (recurring_founded === undefined) {
      throw new Error(
        `Nenhuma transação parcelada encontrada (${recurring_founded})`
      );
    }

    if (!canBeModified(recurring_founded.start_date)) {
      throw new Error("Não é possível modificar itens de saldos fechados!")
    }

    const item_value = await imt.get_item_value(
      db,
      recurring_id,
      item_value_id
    );

    if (item_value === undefined) {
      throw new Error(`Nenhum valor de parcela encontrado (${item_value})`);
    }

    await iv.mark_as_processed(db, item_value.id);

    // // ======================================
    // // POST MARKED
    // // ======================================
    // const data = {
    // 	date: item_value.scheduled_at,
    // 	amount: item_value.amount,
    // 	cashflow_type: recurring_founded.cashflow_type,
    // };

    // if (recurring_founded.transfer_method_code === "cash") {
    // 	// Fluxo do dinheiro
    // 	await pl_bc_up.apply_executed_amount(data).catch(error => { throw error });
    // } else {
    // 	// Fluxo do banco
    // 	bup.balance_bank_update_pipeline(db, {
    // 		...data,
    // 		transaction_instrument_id:
    // 			recurring_founded.transaction_instrument_id,
    // 	});
    // }
    transactionsFn.commit();
  } catch (error) {
    transactionsFn.rollback();
    throw error;
  }
}
