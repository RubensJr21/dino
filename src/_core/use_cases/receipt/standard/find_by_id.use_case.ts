import { TypeOfVariants, VARIANTS_OF_ITEM_VALUE } from "@core-types/variants_items";
import FindStandardById from "@core/factory_use_case_items/standard/find_by_id";

export default class FindStandardReceiptById extends FindStandardById {
  protected variant: TypeOfVariants = VARIANTS_OF_ITEM_VALUE.Receipt;
}