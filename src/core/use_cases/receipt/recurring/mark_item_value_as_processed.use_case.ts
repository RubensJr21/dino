import UseCase_RecurringItemValueItemValue_MarkAsProcessed from "@src/core/shared/factory_use_case_items/recurring/mark_item_value_as_processed";
import { TypeOfVariants } from "@src/core/shared/types/variants_items";

export default class RecurringReceiptItemValue_MarkAsProcessed extends UseCase_RecurringItemValueItemValue_MarkAsProcessed {
  protected variant: TypeOfVariants = "Receipt";
}