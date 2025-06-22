import UseCase_Recurring_UpdateCurrentAmount from "@src/core/shared/factory_use_case_items/recurring/current_amount_update";
import { TypeOfVariants } from "@src/core/shared/types/variants_items";

export default class RecurringPaymentUpdateCurrentAmount extends UseCase_Recurring_UpdateCurrentAmount {
  protected variant: TypeOfVariants = "Payment";
}