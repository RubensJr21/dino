import UseCase_Recurring_Register from "@src/core/shared/factory_use_case_items/recurring/register";
import { TypeOfVariants } from "@src/core/shared/types/variants_items";

export default class RecurringPayment_Register extends UseCase_Recurring_Register {
  protected variant: TypeOfVariants = "Payment";
}