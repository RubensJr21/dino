import UpdateCurrentRecurringAmount from "@src/core/shared/factory_use_case_items/recurring/update_current_amount";
import { TypeOfVariants, VARIANTS_OF_ITEM_VALUE } from "@src/core/shared/types/variants_items";

export default class UpdateCurrentRecurringAmountPayment extends UpdateCurrentRecurringAmount {
  protected variant: TypeOfVariants = VARIANTS_OF_ITEM_VALUE.Payment;
}