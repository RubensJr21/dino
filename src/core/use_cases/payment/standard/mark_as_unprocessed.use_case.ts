import MarkStandardAsUnProcessed from "@src/core/shared/factory_use_case_items/standard/mark_as_unprocessed";
import { TypeOfVariants, VARIANTS_OF_ITEM_VALUE } from "@src/core/shared/types/variants_items";

export default class MarkPaymentStandardAsUnProcessed extends MarkStandardAsUnProcessed {
  protected variant: TypeOfVariants = VARIANTS_OF_ITEM_VALUE.Payment;
}