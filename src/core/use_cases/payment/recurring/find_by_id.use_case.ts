import UseCase_Recurring_FindById from "@src/core/shared/factory_use_case_items/recurring/find_by_id";
import { TypeOfVariants } from "@src/core/shared/types/variants_items";

export default class RecurringPayment_FindById extends UseCase_Recurring_FindById {
  protected variant: TypeOfVariants = "Payment";
}