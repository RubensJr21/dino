import { TypeOfVariants, VARIANTS_OF_ITEM_VALUE } from "@core-types/variants_items";
import ListAllRecurringItems from "@core/factory_use_case_items/recurring/list_all_items";

export default class ListAllRecurringItemValuePayments extends ListAllRecurringItems {
  protected variant: TypeOfVariants = VARIANTS_OF_ITEM_VALUE.Payment;
}