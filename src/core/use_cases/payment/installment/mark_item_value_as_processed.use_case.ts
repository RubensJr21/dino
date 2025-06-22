import UseCase_InstallmentItemValue_MarkAsProcessed from "@src/core/shared/factory_use_case_items/installment/mark_item_value_as_processed";
import { TypeOfVariants } from "@src/core/shared/types/variants_items";

export default class InstallmentPaymentItemValue_MarkAsProcessed extends UseCase_InstallmentItemValue_MarkAsProcessed {
  protected variant: TypeOfVariants = "Payment";
}