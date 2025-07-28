import RegisterRecurring from "@src/core/shared/factory_use_case_items/recurring/register";
import { TypeOfVariants, VARIANTS_OF_ITEM_VALUE } from "@src/core/shared/types/variants_items";

export default class RegisterRecurringPayment extends RegisterRecurring {
  protected variant: TypeOfVariants = VARIANTS_OF_ITEM_VALUE.Payment;
}