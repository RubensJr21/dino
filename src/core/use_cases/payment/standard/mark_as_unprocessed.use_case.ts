import UseCase_ItemValueItemValue_MarkAsUnprocessed from "@src/core/shared/factory_use_case_items/standard/mark_as_unprocessed";
import { TypeOfVariants } from "@src/core/shared/types/variants_items";

export default class PaymentItemValue_MarkAsUnprocessed extends UseCase_ItemValueItemValue_MarkAsUnprocessed {
  protected variant: TypeOfVariants = "Payment";
}