import RegisterStandard from "@src/core/shared/factory_use_case_items/standard/register";
import { TypeOfVariants, VARIANTS_OF_ITEM_VALUE } from "@src/core/shared/types/variants_items";

export default class RegisterStandardReceipt extends RegisterStandard {
  protected variant: TypeOfVariants = VARIANTS_OF_ITEM_VALUE.Receipt;
}