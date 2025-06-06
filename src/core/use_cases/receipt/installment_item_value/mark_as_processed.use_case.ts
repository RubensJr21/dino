import UseCase_InstallmentItemValue_MarkAsProcessed from "@src/core/shared/factory_use_case_items/installment_item_value/mark_as_processed";
import { TypeOfVariants } from "@src/core/shared/types/variants_items";

export default class InstallmentReceipt_MarkAsProcessed extends UseCase_InstallmentItemValue_MarkAsProcessed {
  protected variant: TypeOfVariants = "Receipt";
}