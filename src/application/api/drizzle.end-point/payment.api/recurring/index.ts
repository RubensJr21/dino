import delete_installment from "./delete";
import find_by_id from "./find_by_id";
import list_all from "./list_all";
import mark_item_value_as_processed from "./mark_item_value_as_processed";
import mark_item_value_as_unprocessed from "./mark_item_value_as_unprocessed";
import register from "./register";
import update_current_amount from "./update_current_amount";

const RecurringPaymentDrizzleApi = {
  register,
  update_current_amount,
  find_by_id,
  delete: delete_installment,
  list_all,
  mark_item_value_as_processed,
  mark_item_value_as_unprocessed,
}

export default RecurringPaymentDrizzleApi;