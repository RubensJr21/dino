import UseCase_RecurringItemValue_MarkAsProcessed from "@src/core/shared/factory_use_case_items/recurring/mark_item_value_as_processed";
import { TypeOfVariants } from "@src/core/shared/types/variants_items";

export default class RecurringPaymentItemValue_MarkAsProcessed extends UseCase_RecurringItemValue_MarkAsProcessed {
  protected variant: TypeOfVariants = "Payment";
}