import { TypeOfVariants, VARIANTS_OF_ITEM_VALUE } from "@core-types/variants_items";
import ListAllRecurrings from "@core/factory_use_case_items/recurring/list_all";

export default class ListAllRecurringReceipts extends ListAllRecurrings {
  protected variant: TypeOfVariants = VARIANTS_OF_ITEM_VALUE.Receipt;
}