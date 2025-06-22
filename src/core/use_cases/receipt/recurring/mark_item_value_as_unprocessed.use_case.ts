import UseCase_RecurringItemValueItemValue_MarkAsUnprocessed from "@src/core/shared/factory_use_case_items/recurring/mark_item_value_as_unprocessed";
import { TypeOfVariants } from "@src/core/shared/types/variants_items";

export default class RecurringReceiptItemValue_MarkAsUnprocessed extends UseCase_RecurringItemValueItemValue_MarkAsUnprocessed {
  protected variant: TypeOfVariants = "Receipt";
}