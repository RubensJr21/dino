import { TypeOfVariants, VARIANTS_OF_ITEM_VALUE } from "@core-types/variants_items";
import DisableRecurring from "@core/factory_use_case_items/recurring/disable";

export default class DisableRecurringPayment extends DisableRecurring {
  protected variant: TypeOfVariants = VARIANTS_OF_ITEM_VALUE.Payment;
}