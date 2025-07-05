import UseCase_RecurringItemValue_Update from "@src/core/shared/factory_use_case_items/recurring/register";
import { TypeOfVariants, VARIANTS_OF_ITEM_VALUE } from "@src/core/shared/types/variants_items";

export default class RecurringReceipt_Update extends UseCase_RecurringItemValue_Update {
  protected variant: TypeOfVariants = VARIANTS_OF_ITEM_VALUE.Receipt;
}