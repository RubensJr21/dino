import UseCase_RecurringItemValue_Update from "@src/core/shared/factory_use_case_items/recurring_item_value/register";
import { TypeOfVariants } from "@src/core/shared/types/variants_items";

export default class RecurringPayment_Update extends UseCase_RecurringItemValue_Update {
  protected variant: TypeOfVariants = "Payment";
}