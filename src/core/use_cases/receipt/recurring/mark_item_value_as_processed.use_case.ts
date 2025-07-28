import MarkRecurringAsProcessed from "@src/core/shared/factory_use_case_items/recurring/mark_item_value_as_processed";
import { TypeOfVariants, VARIANTS_OF_ITEM_VALUE } from "@src/core/shared/types/variants_items";

export default class MarkRecurringAsReceiptProcessed extends MarkRecurringAsProcessed {
  protected variant: TypeOfVariants = VARIANTS_OF_ITEM_VALUE.Receipt;
}