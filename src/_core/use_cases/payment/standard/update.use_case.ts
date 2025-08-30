import { TypeOfVariants, VARIANTS_OF_ITEM_VALUE } from "@core-types/variants_items";
import UpdateStandard from "@core/factory_use_case_items/standard/update";

export default class UpdateStandardPayment extends UpdateStandard {
  protected variant: TypeOfVariants = VARIANTS_OF_ITEM_VALUE.Payment;
}