import UseCase_Recurring_Delete from "@src/core/shared/factory_use_case_items/recurring/delete";
import { TypeOfVariants, VARIANTS_OF_ITEM_VALUE } from "@src/core/shared/types/variants_items";

export default class RecurringPayment_Delete extends UseCase_Recurring_Delete {
  protected variant: TypeOfVariants = VARIANTS_OF_ITEM_VALUE.Payment;
}