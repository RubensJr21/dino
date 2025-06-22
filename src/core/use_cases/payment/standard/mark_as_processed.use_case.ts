import UseCase_ItemValueItemValue_MarkAsProcessed from "@src/core/shared/factory_use_case_items/standard/mark_as_processed";
import { TypeOfVariants } from "@src/core/shared/types/variants_items";

export default class PaymentItemValue_MarkAsProcessed extends UseCase_ItemValueItemValue_MarkAsProcessed {
  protected variant: TypeOfVariants = "Payment";
}