import delete_standard from "./delete";
import edit from "./edit";
import find_by_id from "./find_by_id";
import list_all from "./list_all";
import mark_as_processed from "./mark_as_processed";
import mark_as_unprocessed from "./mark_as_unprocessed";
import register from "./register";

const StandardReceiptDrizzleApi = {
  delete: delete_standard,
  edit,
  find_by_id,
  list_all,
  mark_as_processed,
  mark_as_unprocessed,
  register,
};

export default StandardReceiptDrizzleApi;