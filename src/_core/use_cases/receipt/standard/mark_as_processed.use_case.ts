import { TypeOfVariants, VARIANTS_OF_ITEM_VALUE } from "@core-types/variants_items";
import MarkStandardAsProcessed from "@core/factory_use_case_items/standard/mark_as_processed";

export default class MarkStandardReceiptAsProcessed extends MarkStandardAsProcessed {
  protected variant: TypeOfVariants = VARIANTS_OF_ITEM_VALUE.Receipt;
}