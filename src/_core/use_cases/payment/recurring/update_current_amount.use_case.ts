import { TypeOfVariants, VARIANTS_OF_ITEM_VALUE } from "@core-types/variants_items";
import UpdateCurrentRecurringAmount from "@core/factory_use_case_items/recurring/update_current_amount";

export default class UpdateCurrentRecurringAmountPayment extends UpdateCurrentRecurringAmount {
  protected variant: TypeOfVariants = VARIANTS_OF_ITEM_VALUE.Payment;
}