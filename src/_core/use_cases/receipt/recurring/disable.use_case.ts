import { TypeOfVariants, VARIANTS_OF_ITEM_VALUE } from "@core-types/variants_items";
import DisableRecurring from "@core/factory_use_case_items/recurring/disable";

export default class DisableRecurringReceipt extends DisableRecurring {
  protected variant: TypeOfVariants = VARIANTS_OF_ITEM_VALUE.Receipt;
}