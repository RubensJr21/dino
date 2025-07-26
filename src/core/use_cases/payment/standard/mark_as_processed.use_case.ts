import MarkStandardAsProcessed from "@src/core/shared/factory_use_case_items/standard/mark_as_processed";
import { TypeOfVariants, VARIANTS_OF_ITEM_VALUE } from "@src/core/shared/types/variants_items";

export default class MarkPaymentStandardAsProcessed extends MarkStandardAsProcessed {
  protected variant: TypeOfVariants = VARIANTS_OF_ITEM_VALUE.Payment;
}