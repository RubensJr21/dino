import ListAllRecurringItems from "@src/core/shared/factory_use_case_items/recurring/list_all_items";
import { TypeOfVariants, VARIANTS_OF_ITEM_VALUE } from "@src/core/shared/types/variants_items";

export default class ListAllRecurringItemValueReceipts extends ListAllRecurringItems {
  protected variant: TypeOfVariants = VARIANTS_OF_ITEM_VALUE.Receipt;
}