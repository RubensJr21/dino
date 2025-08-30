import { TypeOfVariants, VARIANTS_OF_ITEM_VALUE } from "@core-types/variants_items";
import MarkInstallmentItemValueAsUnprocessed from "@core/factory_use_case_items/installment/mark_item_value_as_unprocessed";

export default class MarkInstallmentReceiptItemValueAsUnprocessed extends MarkInstallmentItemValueAsUnprocessed {
  protected variant: TypeOfVariants = VARIANTS_OF_ITEM_VALUE.Receipt;
}