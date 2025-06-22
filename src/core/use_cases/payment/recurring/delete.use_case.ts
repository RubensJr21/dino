import UseCase_Recurring_Delete from "@src/core/shared/factory_use_case_items/recurring/delete";
import { TypeOfVariants } from "@src/core/shared/types/variants_items";

export default class RecurringPayment_Delete extends UseCase_Recurring_Delete {
  protected variant: TypeOfVariants = "Payment";
}