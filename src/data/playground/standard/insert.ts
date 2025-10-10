/*
-- ======================
-- TABELA: standard
-- OBS:
--   > As seguintes tabelas precisam ter dados:
--     - transfer_method
--     - transaction_instrument 
--     - category
-- ======================
*/

import {
  canBeModified,
  drawCashflowType,
  randomFutureDate,
  randomIndex,
  randomIntBetween
} from "@data/playground/utils";
import * as btt from "@data_functions/base_transaction_type";
import * as cat from "@data_functions/category";
import * as iv from "@data_functions/item_value";
import * as std from "@data_functions/standard";
import * as ti from "@data_functions/transaction_instrument";
import * as tm from "@data_functions/transfer_method";
import { db, transactionsFn } from "@database/db-instance";

interface DataType {
  description: btt.infer_insert["description"];
  cashflow_type: btt.infer_insert["cashflow_type"];
  category_id: btt.infer_insert["fk_id_category"];
  transaction_instrument_id: ti.infer_select["id"];
  transfer_method_code: tm.infer_select["code"];
  amount: iv.infer_insert["amount"];
  scheduled_at: iv.infer_insert["scheduled_at"];
}

export const insert_standard = async (data: DataType) => {
  transactionsFn.begin();
  try {
    if (!canBeModified(data.scheduled_at)) {
      throw new Error("Não é possível adicionar itens à saldos já fechados!")
    }
    
    const base_transaction_type = await btt.insert(db, {
      description: data.description,
      cashflow_type: data.cashflow_type,
      fk_id_category: data.category_id,
      fk_id_transaction_instrument: data.transaction_instrument_id,
    });

    const [item_value] = await iv.insert(db, {
      scheduled_at: data.scheduled_at,
      amount: data.amount,
    });

    const [standard] = await std.insert(db, {
      id: base_transaction_type[0].id,
      fk_id_item_value: item_value.id,
    });

    transactionsFn.commit();
    return standard.id;
  } catch (error) {
    transactionsFn.rollback();
    throw error;
  }
};

async function main() {
  // ESCOLHENDO TRANSFER_METHOD
  const transfer_methods = await tm.get_all(db);
  const indexTM = randomIndex(transfer_methods.length);
  const method_choose = transfer_methods[indexTM];

  // ESCOLHENDO TRANSACTION_INSTRUMENT
  const transaction_instruments = await ti.get_all_filtered_by_transfer_method(
    db,
    method_choose.code
  );
  const indexTI = randomIndex(transaction_instruments.length);
  const selected_transaction_instrument = transaction_instruments[indexTI];

  // ESCOLHENDO CATEGORY
  const categories = await cat.get_all(db);
  const indexC = randomIndex(categories.length);
  const selected_category = categories[indexC];

  const description = "Minha descrição de teste";
  const cashflow_type = drawCashflowType();
  const scheduled_at = randomFutureDate(randomIntBetween(0, 120));
  const amount = randomIntBetween(5, 100_000);

  await insert_standard({
    description,
    cashflow_type,
    category_id: selected_category.id,
    transaction_instrument_id: selected_transaction_instrument.id,
    transfer_method_code: selected_transaction_instrument.transfer_method_code,
    amount,
    scheduled_at,
  });
}
