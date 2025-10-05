/*
-- ======================
-- TABELA: installment
-- OBS:
--   > As seguintes tabelas precisam ter dados:
--     - transfer_method
--     - transaction_instrument 
--     - category
-- ======================
*/

import {
  addMonthsKeepingDay,
  canBeModified,
  drawCashflowType,
  randomIndex,
  randomIntBetween,
  randomRangeDate,
} from "@data/playground/utils";
import * as btt from "@data_functions/base_transaction_type";
import * as cat from "@data_functions/category";
import * as imt from "@data_functions/installment";
import * as iv from "@data_functions/item_value";
import * as rt from "@data_functions/recurrence_type";
import * as ti from "@data_functions/transaction_instrument";
import * as tm from "@data_functions/transfer_method";
import { db, transactionsFn } from "@database/db-instance";

interface DataType {
  description: btt.infer_insert["description"];
  cashflow_type: btt.infer_insert["cashflow_type"];
  category_id: btt.infer_insert["fk_id_category"];

  transaction_instrument_id: ti.infer_select["id"];

  transfer_method_code: tm.infer_select["code"];

  start_date: imt.infer_insert["start_date"];

  installments_number: imt.infer_select["installments_number"];
  total_amount: imt.infer_select["total_amount"];
}

export const insert_installment = async (data: DataType) => {
  transactionsFn.begin();
  try {
    if (!canBeModified(data.start_date)) {
      throw new Error("Não é possível adicionar itens à saldos fechados!")
    }

    if(data.installments_number <= 2){
      throw new Error(`Valor ${data.installments_number} menor que 2!`)
    }

    const base_transaction_type = await btt.insert(db, {
      description: data.description,
      cashflow_type: data.cashflow_type,
      fk_id_category: data.category_id,
      fk_id_transaction_instrument: data.transaction_instrument_id,
    });

    const [installment] = await imt.insert(db, {
      id: base_transaction_type[0].id,
      start_date: data.start_date,
      installments_number: data.installments_number,
      total_amount: data.total_amount,
    });

    const items_values: Array<{
      item_value_id: number;
      month: number;
      year: number;
    }> = [];

    const installments = imt.calculate_installments(
      data.total_amount,
      data.installments_number
    );

    for (let i = 0; i < data.installments_number; i++) {
      const scheduled_at = addMonthsKeepingDay(data.start_date, i)
      
      const [item_value] = await iv.insert(db, {
        scheduled_at,
        // Fazendo assim o primeiro item terá o valor dele
        // E para as execuções seguintes o valor ficará fixado em 1 (posição 2)
        amount: installments[Math.min(i, 1)],
      });

      await imt.register_item_value(db, {
        fk_id_installment: installment.id,
        fk_id_item_value: item_value.id,
      });

      items_values.push({
        item_value_id: item_value.id,
        month: item_value.scheduled_at.getMonth(),
        year: item_value.scheduled_at.getFullYear(),
      });

      // // ======================================
      // // POST INSERT
      // // ======================================
      // // VERIFICAR EM QUAL BALANÇO ESSE ITEM DEVE SER INSERIDO
      // if (data.transfer_method_code === "cash") {
      // 	bip.balance_cash_insert_pipeline(db, {
      // 		month,
      // 		year,
      // 		cashflow_type: data.cashflow_type,
      // 		amount: item_value.amount,
      // 	});
      // } else {
      // 	bip.balance_bank_insert_pipeline(db, {
      // 		month,
      // 		year,
      // 		cashflow_type: data.cashflow_type,
      // 		amount: item_value.amount,
      // 		transaction_instrument_id: data.transaction_instrument_id,
      // 	});
      // }
      console.log("installment inserido!");
    }
    transactionsFn.commit();
  } catch (error) {
    transactionsFn.rollback();
    throw error;
  }
};

async function main() {
  // ESCOLHENDO TRANSFER_METHOD
  const transfer_methods = await tm.get_all(db);
  const indexTM = randomIndex(transfer_methods.length); // Adicionar lógica interativa
  const method_choose = transfer_methods[indexTM];

  // ESCOLHENDO TRANSACTION_INSTRUMENT
  const transaction_instruments = await ti.get_all_filtered_by_transfer_method(
    db,
    method_choose.code
  );
  const indexTI = randomIndex(transaction_instruments.length); // Adicionar lógica interativa
  const selected_transaction_instrument = transaction_instruments[indexTI];

  // ESCOLHENDO CATEGORY
  const categories = await cat.get_all(db);
  const indexC = randomIndex(categories.length); // Adicionar lógica interativa
  const selected_category = categories[indexC];

  // ESCOLHENDO RECURRENCE_TYPE
  const recurrence_types = await rt.get_all(db);
  const indexRT = randomIndex(recurrence_types.length); // Adicionar lógica interativa
  const selected_recurrence_type = recurrence_types[indexRT];

  const description = "Minha descrição de teste"; // Adicionar lógica interativa
  const cashflow_type = drawCashflowType(); // Adicionar lógica interativa

  const rangeDate = randomRangeDate();

  const total_amount = randomIntBetween(5_000, 200_000);

  const installments_number = randomIntBetween(1, 2);

  await insert_installment({
    description,
    cashflow_type,
    category_id: selected_category.id,
    transaction_instrument_id: selected_transaction_instrument.id,
    transfer_method_code: selected_transaction_instrument.transfer_method_code,
    total_amount,
    start_date: rangeDate.start_date,
    installments_number,
  });
}
