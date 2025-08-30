import { TypeOfVariants, VARIANTS_OF_ITEM_VALUE } from "@core-types/variants_items";
import EnableRecurring from "@core/factory_use_case_items/recurring/enable";

export default class EnableRecurringPayment extends EnableRecurring {
  protected variant: TypeOfVariants = VARIANTS_OF_ITEM_VALUE.Payment;
}