import { TypeOfVariants, VARIANTS_OF_ITEM_VALUE } from "@core-types/variants_items";
import DeleteStandard from "@core/factory_use_case_items/standard/delete";

export default class DeleteStandardReceipt extends DeleteStandard {
  protected variant: TypeOfVariants = VARIANTS_OF_ITEM_VALUE.Receipt;
}