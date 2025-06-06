import UseCase_ItemValue_MarkAsProcessed from "@src/core/shared/factory_use_case_items/item_value/mark_as_processed";
import { TypeOfVariants } from "@src/core/shared/types/variants_items";

export default class Payment_MarkAsProcessed extends UseCase_ItemValue_MarkAsProcessed {
  protected variant: TypeOfVariants = "Payment";
}