import UseCase_RecurringItemValue_Delete from "@src/core/shared/factory_use_case_items/recurring_item_value/delete";
import { TypeOfVariants } from "@src/core/shared/types/variants_items";

export default class RecurringReceipt_Delete extends UseCase_RecurringItemValue_Delete {
  protected variant: TypeOfVariants = "Receipt";
}