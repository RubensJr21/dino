import { TypeOfVariants, VARIANTS_OF_ITEM_VALUE } from "@core-types/variants_items";
import MarkStandardAsUnProcessed from "@core/factory_use_case_items/standard/mark_as_unprocessed";

export default class MarkStandardPaymentAsUnProcessed extends MarkStandardAsUnProcessed {
  protected variant: TypeOfVariants = VARIANTS_OF_ITEM_VALUE.Payment;
}