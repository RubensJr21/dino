import UseCase_RecurringItemValueItemValue_MarkAsUnprocessed from "@src/core/shared/factory_use_case_items/recurring/mark_item_value_as_unprocessed";
import { TypeOfVariants, VARIANTS_OF_ITEM_VALUE } from "@src/core/shared/types/variants_items";

export default class RecurringReceiptItemValue_MarkAsUnprocessed extends UseCase_RecurringItemValueItemValue_MarkAsUnprocessed {
  protected variant: TypeOfVariants = VARIANTS_OF_ITEM_VALUE.Receipt;
}