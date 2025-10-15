import { canBeModified } from "@data/playground/utils";
import * as btt from "@data_functions/base_transaction_type";
import * as iv from "@data_functions/item_value";
import * as std from "@data_functions/standard";
import { db, transactionsFn } from "@database/db-instance";
import { standard } from "@database/schema";

export const delete_standard = async (
	standard_id: typeof standard.$inferSelect.id
) => {
	transactionsFn.begin();
	try {
		const standard_for_delete = await std.get(db, standard_id);
		if (standard_for_delete === undefined) {
			throw new Error("standard_id inexistente.");
		}

    if(!canBeModified(standard_for_delete.scheduled_at)) {
      throw new Error("Não é possível modificar itens de saldos já fechados!")
    }

		await std.remove(db, standard_for_delete.id);
		await btt.remove(db, standard_for_delete.id);
		await iv.remove(db, [standard_for_delete.item_value_id]);

		transactionsFn.commit();
	} catch (error) {
		transactionsFn.rollback();
		throw error;
	}
};
