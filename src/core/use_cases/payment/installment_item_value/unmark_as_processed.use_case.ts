import UseCase_InstallmentItemValue_UnmarkAsProcessed from "@src/core/shared/factory_use_case_items/installment_item_value/unmark_as_processed";
import { TypeOfVariants } from "@src/core/shared/types/variants_items";

export default class InstallmentPayment_UnmarkAsProcessed extends UseCase_InstallmentItemValue_UnmarkAsProcessed {
  protected variant: TypeOfVariants = "Payment";
}