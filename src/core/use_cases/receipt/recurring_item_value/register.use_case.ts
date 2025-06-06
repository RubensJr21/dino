import UseCase_RecurringItemValue_Register from "@src/core/shared/factory_use_case_items/recurring_item_value/register";
import { TypeOfVariants } from "@src/core/shared/types/variants_items";

export default class RecurringReceipt_Register extends UseCase_RecurringItemValue_Register {
  protected variant: TypeOfVariants = "Receipt";
}