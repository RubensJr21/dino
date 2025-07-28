import ListAllRecurrings from "@src/core/shared/factory_use_case_items/recurring/list_all";
import { TypeOfVariants, VARIANTS_OF_ITEM_VALUE } from "@src/core/shared/types/variants_items";

export default class ListAllRecurringReceipts extends ListAllRecurrings {
  protected variant: TypeOfVariants = VARIANTS_OF_ITEM_VALUE.Receipt;
}