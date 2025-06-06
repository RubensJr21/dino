import UseCase_RecurringItemValue_UnmarkAsProcessed from "@src/core/shared/factory_use_case_items/recurring_item_value/unmark_as_processed";
import { TypeOfVariants } from "@src/core/shared/types/variants_items";

export default class RecurringReceipt_UnmarkAsProcessed extends UseCase_RecurringItemValue_UnmarkAsProcessed {
  protected variant: TypeOfVariants = "Receipt";
}