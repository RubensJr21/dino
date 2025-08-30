import { TypeOfVariants, VARIANTS_OF_ITEM_VALUE } from "@core-types/variants_items";
import RegisterStandard from "@core/factory_use_case_items/standard/register";

export default class RegisterStandardPayment extends RegisterStandard {
  protected variant: TypeOfVariants = VARIANTS_OF_ITEM_VALUE.Payment;
}