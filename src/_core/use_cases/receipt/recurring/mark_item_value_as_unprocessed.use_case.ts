import { TypeOfVariants, VARIANTS_OF_ITEM_VALUE } from "@core-types/variants_items";
import MarkRecurringAsUnProcessed from "@core/factory_use_case_items/recurring/mark_item_value_as_unprocessed";

export default class MarkRecurringAsReceiptUnProcessed extends MarkRecurringAsUnProcessed {
  protected variant: TypeOfVariants = VARIANTS_OF_ITEM_VALUE.Receipt;
}