import UseCase_Recurring_Disable from "@src/core/shared/factory_use_case_items/recurring/disable";
import { TypeOfVariants } from "@src/core/shared/types/variants_items";

export default class RecurringPaymentDisable extends UseCase_Recurring_Disable {
  protected variant: TypeOfVariants = "Payment";
}