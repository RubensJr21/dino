import UseCase_InstallmentItemValue_MarkAsUnprocessed from "@src/core/shared/factory_use_case_items/installment/mark_item_value_as_unprocessed";
import { TypeOfVariants } from "@src/core/shared/types/variants_items";

export default class InstallmentReceiptItemValue_MarkAsUnprocessed extends UseCase_InstallmentItemValue_MarkAsUnprocessed {
  protected variant: TypeOfVariants = "Receipt";
}