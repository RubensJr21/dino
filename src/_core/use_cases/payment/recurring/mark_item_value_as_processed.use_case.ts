import { TypeOfVariants, VARIANTS_OF_ITEM_VALUE } from "@core-types/variants_items";
import MarkRecurringItemValueAsProcessed from "@core/factory_use_case_items/recurring/mark_item_value_as_processed";

export default class MarkRecurringPaymentItemValueAsProcessed extends MarkRecurringItemValueAsProcessed {
  protected variant: TypeOfVariants = VARIANTS_OF_ITEM_VALUE.Payment;
}