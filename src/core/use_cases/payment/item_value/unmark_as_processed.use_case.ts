import UseCase_ItemValue_UnmarkAsProcessed from "@src/core/shared/factory_use_case_items/item_value/unmark_as_processed";
import { TypeOfVariants } from "@src/core/shared/types/variants_items";

export default class Payment_UnmarkAsProcessed extends UseCase_ItemValue_UnmarkAsProcessed {
  protected variant: TypeOfVariants = "Payment";
}