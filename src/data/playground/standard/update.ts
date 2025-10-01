import { move_amount_and_date } from "@data/pipelines/balance_cash/update/move_amount_and_date";
import { move_date } from "@data/pipelines/balance_cash/update/move_date";
import { update_amount } from "@data/pipelines/balance_cash/update/update_amount";
import * as btt from "@data_functions/base_transaction_type";
import * as cat from "@data_functions/category";
import * as iv from "@data_functions/item_value";
import * as std from "@data_functions/standard";
import { db, transactionsFn } from "@database/db-instance";

export async function update_standard(
  standard_id: std.infer_select["id"],
  data: {
    description?: btt.infer_insert["description"];
    category?: cat.infer_insert["code"];
    amount?: iv.infer_select["amount"];
    scheduled_at?: iv.infer_select["scheduled_at"]
  }
) {
  transactionsFn.begin();
  try {
    const standard_founded = await std.get(db, standard_id);
    if (standard_founded === undefined) {
      throw new Error(
        `Nenhuma transação padrão encontrada (${standard_founded})`
      );
    }

    const updates: {
      description?: btt.infer_insert["description"];
      fk_id_category?: cat.infer_insert["id"];
      amount?: iv.infer_select["amount"];
      scheduled_at?: iv.infer_select["scheduled_at"]
    } = {};

    if (data.description !== undefined) {
      if (data.description.trim().length === 0) {
        throw new Error(`A descrição não pode ser vazia (${data.description})`);
      }
      updates.description = data.description;
    }

    if (data.category !== undefined) {
      const category_founded = await cat.get_by_code(db, data.category);
      if (category_founded === undefined) {
        throw new Error(
          `Nenhuma categoria encontrada com code=${data.category} (${category_founded})`
        );
      }
      updates.fk_id_category = category_founded.id;
    }

    if (data.amount !== undefined) {
      updates.amount = data.amount
    }
    if (data.scheduled_at !== undefined) {
      console.log("Vou atualizar a data!")
      updates.scheduled_at = data.scheduled_at
    }

    if (
      updates.description !== undefined ||
      updates.fk_id_category !== undefined
    ) {
      await btt.update(db, standard_founded.id, {
        description: updates.description,
        fk_id_category: updates.fk_id_category
      }).catch(error => { throw error });
    }

    if (updates.amount !== undefined || updates.scheduled_at !== undefined) {
      await iv.update(db, standard_founded.item_value_id, {
        amount: updates.amount,
        scheduled_at: updates.scheduled_at
      }).catch(error => { throw error })
    }

    // ==============================
    // Update Balance
    // ==============================

    const cashflow_type = standard_founded.cashflow_type;
    if (standard_founded.transfer_method_code === "cash") {
      // Verificar se foi processada
      //  Se a transação foi processada:
      //    - precisa remover do planned e executed no balanço antigo
      //    - precisa adicionar ao planned e executed no balanço novo
      //    - Se após a remoção o blanço ficar zerado ele irá ser removido
      //  Se a transação não foi processada:
      //    - precisa remover do planned no balanço antigo
      //    - precisa adicionar ao planned no balanço novo
      //    - Se após a remoção o blanço ficar zerado ele irá ser removido
      if (updates.amount !== undefined && updates.scheduled_at !== undefined) {
        // Preico mover de um balanço para o outro
        await move_amount_and_date({
          new_date: updates.scheduled_at,
          new_amount: updates.amount,
          old_date: standard_founded.scheduled_at,
          old_amount: standard_founded.amount,
          cashflow_type,
          was_processed: standard_founded.was_processed
        })
      } else if (updates.amount !== undefined) {
        const date = standard_founded.scheduled_at
        await update_amount({
          new_amount: updates.amount,
          old_amount: standard_founded.amount,
          date,
          cashflow_type,
          was_processed: standard_founded.was_processed
        })
      } else if (updates.scheduled_at !== undefined) {
        // Amount não mudou (amount === undefined)
        const amount = standard_founded.amount;
        await move_date({
          new_date: updates.scheduled_at,
          old_date: standard_founded.scheduled_at,
          amount,
          cashflow_type,
          was_processed: standard_founded.was_processed
        })
      }
    } else {

    }

    transactionsFn.commit();
    console.log("standard atualizado!");
  } catch (error) {
    transactionsFn.rollback();
    throw error;
  }
}
