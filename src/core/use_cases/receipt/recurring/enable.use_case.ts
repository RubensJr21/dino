import UseCase_Recurring_Enable from "@src/core/shared/factory_use_case_items/recurring/enable";
import { TypeOfVariants, VARIANTS_OF_ITEM_VALUE } from "@src/core/shared/types/variants_items";

export default class RecurringReceiptEnable extends UseCase_Recurring_Enable {
  protected variant: TypeOfVariants = VARIANTS_OF_ITEM_VALUE.Receipt;
}