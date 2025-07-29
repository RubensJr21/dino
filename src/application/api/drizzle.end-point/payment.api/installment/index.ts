import delete_installment from "./delete";
import edit from "./edit";
import find_by_id from "./find_by_id";
import list_all from "./list_all";
import list_all_items from "./list_all_items";
import mark_item_value_as_processed from "./mark_item_value_as_processed";
import mark_item_value_as_unprocessed from "./mark_item_value_as_unprocessed";
import register from "./register";

const InstallmentPaymentDrizzleApi = {
  register,
  edit,
  find_by_id,
  delete: delete_installment,
  list_all,
  list_all_items,
  mark_item_value_as_processed,
  mark_item_value_as_unprocessed,
}

export default InstallmentPaymentDrizzleApi;