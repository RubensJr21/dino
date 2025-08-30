import { TypeOfVariants, VARIANTS_OF_ITEM_VALUE } from "@core-types/variants_items";
import MarkRecurringItemValueItemValueAsUnprocessed from "@core/factory_use_case_items/recurring/mark_item_value_as_unprocessed";

export default class MarkRecurringPaymentItemValueAsUnprocessed extends MarkRecurringItemValueItemValueAsUnprocessed {
  protected variant: TypeOfVariants = VARIANTS_OF_ITEM_VALUE.Payment;
}