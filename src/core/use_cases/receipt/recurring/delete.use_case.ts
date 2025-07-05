import UseCase_RecurringItemValue_Delete from "@src/core/shared/factory_use_case_items/recurring/delete";
import { TypeOfVariants, VARIANTS_OF_ITEM_VALUE } from "@src/core/shared/types/variants_items";

export default class RecurringReceipt_Delete extends UseCase_RecurringItemValue_Delete {
  protected variant: TypeOfVariants = VARIANTS_OF_ITEM_VALUE.Receipt;
}