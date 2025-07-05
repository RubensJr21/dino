import UseCase_Recurring_ListAll from "@src/core/shared/factory_use_case_items/recurring/list_all";
import { TypeOfVariants, VARIANTS_OF_ITEM_VALUE } from "@src/core/shared/types/variants_items";

export default class RecurringPayment_ListAll extends UseCase_Recurring_ListAll {
  protected variant: TypeOfVariants = VARIANTS_OF_ITEM_VALUE.Payment;
}