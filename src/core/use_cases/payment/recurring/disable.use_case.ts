import DisableRecurring from "@src/core/shared/factory_use_case_items/recurring/disable";
import { TypeOfVariants, VARIANTS_OF_ITEM_VALUE } from "@src/core/shared/types/variants_items";

export default class DisableRecurringPayment extends DisableRecurring {
  protected variant: TypeOfVariants = VARIANTS_OF_ITEM_VALUE.Payment;
}