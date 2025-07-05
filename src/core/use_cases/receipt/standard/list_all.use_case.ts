import UseCase_ItemValue_ListAll from "@src/core/shared/factory_use_case_items/standard/list_all";
import { TypeOfVariants, VARIANTS_OF_ITEM_VALUE } from "@src/core/shared/types/variants_items";

export default class Receipt_ListAll extends UseCase_ItemValue_ListAll {
  protected variant: TypeOfVariants = VARIANTS_OF_ITEM_VALUE.Receipt;
}