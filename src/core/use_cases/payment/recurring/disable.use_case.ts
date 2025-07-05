import UseCase_Recurring_Disable from "@src/core/shared/factory_use_case_items/recurring/disable";
import { TypeOfVariants, VARIANTS_OF_ITEM_VALUE } from "@src/core/shared/types/variants_items";

export default class RecurringPaymentDisable extends UseCase_Recurring_Disable {
  protected variant: TypeOfVariants = VARIANTS_OF_ITEM_VALUE.Payment;
}