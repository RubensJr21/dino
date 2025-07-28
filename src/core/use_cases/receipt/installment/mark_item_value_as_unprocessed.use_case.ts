import MarkInstallmentItemValueAsUnprocessed from "@src/core/shared/factory_use_case_items/installment/mark_item_value_as_unprocessed";
import { TypeOfVariants, VARIANTS_OF_ITEM_VALUE } from "@src/core/shared/types/variants_items";

export default class MarkInstallmentReceiptItemValueAsUnprocessed extends MarkInstallmentItemValueAsUnprocessed {
  protected variant: TypeOfVariants = VARIANTS_OF_ITEM_VALUE.Receipt;
}