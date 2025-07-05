import UseCase_ItemValue_Delete from "@src/core/shared/factory_use_case_items/standard/delete";
import { TypeOfVariants, VARIANTS_OF_ITEM_VALUE } from "@src/core/shared/types/variants_items";

export default class Receipt_Delete extends UseCase_ItemValue_Delete {
  protected variant: TypeOfVariants = VARIANTS_OF_ITEM_VALUE.Receipt;
}