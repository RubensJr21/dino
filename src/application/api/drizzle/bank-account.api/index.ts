import disable from "./disable";
import edit from "./edit";
import enable from "./enable";
import list_all from "./list_all";
import list_all_transfers_methods_type from "./list_all_transfers_methods_type";
import register from "./register";

const BankAccountDrizzleApi = {
  register,
  edit,
  enable,
  disable,
  list_all,
  list_all_transfers_methods_type
}

export default BankAccountDrizzleApi;