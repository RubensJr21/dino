import * as ba from "@data_functions/bank_account";
import * as ti from "@data_functions/transaction_instrument";
import * as tm from "@data_functions/transfer_method";
import { db, transactionsFn } from "@database/db-instance";

export async function insert_bank_account(data: {
  nickname: ba.infer_insert["nickname"];
  transfer_methods_enable: tm.infer_select["code"][];
}) {
  transactionsFn.begin();
  try {
    if (data.transfer_methods_enable.length === 0) {
      throw new Error(
        "É necessário informar pelo menos 1 método de transferência"
      );
    }

    const banks = await ba.get_by_nickname(db, data.nickname)

    if (banks.length > 0) {
      throw new Error(
        "Nickname já está sendo utilizado por outra conta bancária."
      )
    }

    const bank_account = await ba.insert(db, {
      nickname: data.nickname,
    });

    if (bank_account === undefined) {
      throw new Error("Erro ao criar conta bancária.");
    }

    const transfer_methods = await tm.get_all_without_code(db, "cash");

    const transfer_methods_candidate = await tm.get_all_filtered_by_codes(db, data.transfer_methods_enable)

    if (transfer_methods_candidate.length === 0) {
      throw new Error(
        "Não foi possível encontrar nenhum dos métodos de transferência informados."
      );
    }

    if (transfer_methods_candidate.length !== data.transfer_methods_enable.length) {
      const invalids_method_codes = tm.diff_method_codes(
        transfer_methods_candidate,
        data.transfer_methods_enable
      );
      throw new Error(
        `Os métodos ${invalids_method_codes.join(", ")} não foram encontrados.`
      );
    }

    await ti.register_transfer_methods(
      db,
      transfer_methods.map((transfer_method) => ({
        fk_id_transfer_method: transfer_method.id,
        fk_id_bank_account: bank_account.id,
        is_enabled: transfer_methods_candidate.findIndex(({ id }) => id === transfer_method.id) !== -1
      }))
    );
    
    transactionsFn.commit();
  } catch (error) {
    transactionsFn.rollback();
    throw error;
  }
}
