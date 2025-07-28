import UpdateStandard from "@src/core/shared/factory_use_case_items/standard/update";
import { TypeOfVariants, VARIANTS_OF_ITEM_VALUE } from "@src/core/shared/types/variants_items";

export default class UpdateStandardPayment extends UpdateStandard {
  protected variant: TypeOfVariants = VARIANTS_OF_ITEM_VALUE.Payment;
}