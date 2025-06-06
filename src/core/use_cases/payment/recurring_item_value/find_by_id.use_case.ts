import UseCase_RecurringItemValue_FindById from "@src/core/shared/factory_use_case_items/recurring_item_value/find_by_id";
import { TypeOfVariants } from "@src/core/shared/types/variants_items";

export default class RecurringPayment_FindById extends UseCase_RecurringItemValue_FindById {
  protected variant: TypeOfVariants = "Payment";
}