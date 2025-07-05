import UseCase_InstallmentItemValue_MarkAsProcessed from "@src/core/shared/factory_use_case_items/installment/mark_item_value_as_processed";
import { TypeOfVariants, VARIANTS_OF_ITEM_VALUE } from "@src/core/shared/types/variants_items";

export default class InstallmentReceiptItemValue_MarkAsProcessed extends UseCase_InstallmentItemValue_MarkAsProcessed {
  protected variant: TypeOfVariants = VARIANTS_OF_ITEM_VALUE.Receipt;
}