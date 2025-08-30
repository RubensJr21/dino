import { TypeOfVariants, VARIANTS_OF_ITEM_VALUE } from "@core-types/variants_items";
import MarkInstallmentItemValueAsProcessed from "@core/factory_use_case_items/installment/mark_item_value_as_processed";

export default class MarkInstallmentPaymentItemValueAsProcessed extends MarkInstallmentItemValueAsProcessed {
  protected variant: TypeOfVariants = VARIANTS_OF_ITEM_VALUE.Payment;
}