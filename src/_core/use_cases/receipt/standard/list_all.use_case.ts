import { TypeOfVariants, VARIANTS_OF_ITEM_VALUE } from "@core-types/variants_items";
import ListAllStandard from "@core/factory_use_case_items/standard/list_all";

export default class ListAllStandardReceipts extends ListAllStandard {
  protected variant: TypeOfVariants = VARIANTS_OF_ITEM_VALUE.Receipt;
}