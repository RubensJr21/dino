import FindStandardById from "@src/core/shared/factory_use_case_items/standard/find_by_id";
import { TypeOfVariants, VARIANTS_OF_ITEM_VALUE } from "@src/core/shared/types/variants_items";

export default class FindStandardPaymentById extends FindStandardById {
  protected variant: TypeOfVariants = VARIANTS_OF_ITEM_VALUE.Payment;
}