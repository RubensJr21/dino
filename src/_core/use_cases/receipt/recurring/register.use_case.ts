import { TypeOfVariants, VARIANTS_OF_ITEM_VALUE } from "@core-types/variants_items";
import RegisterRecurring from "@core/factory_use_case_items/recurring/register";

export default class RegisterRecurringReceipt extends RegisterRecurring {
  protected variant: TypeOfVariants = VARIANTS_OF_ITEM_VALUE.Receipt;
}