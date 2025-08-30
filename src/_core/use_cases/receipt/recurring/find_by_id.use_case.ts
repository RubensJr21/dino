import { TypeOfVariants, VARIANTS_OF_ITEM_VALUE } from "@core-types/variants_items";
import FindRecurringById from "@core/factory_use_case_items/recurring/find_by_id";

export default class FindRecurringReceiptById extends FindRecurringById {
  protected variant: TypeOfVariants = VARIANTS_OF_ITEM_VALUE.Receipt;
}