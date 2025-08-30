import { TypeOfVariants, VARIANTS_OF_ITEM_VALUE } from "@core-types/variants_items";
import MarkRecurringAsProcessed from "@core/factory_use_case_items/recurring/mark_item_value_as_processed";

export default class MarkRecurringAsReceiptProcessed extends MarkRecurringAsProcessed {
  protected variant: TypeOfVariants = VARIANTS_OF_ITEM_VALUE.Receipt;
}