import { TypeOfVariants, VARIANTS_OF_ITEM_VALUE } from "@core-types/variants_items";
import UseCase_ItemValue_Delete from "@core/factory_use_case_items/standard/delete";

export default class DeleteStandardPayment extends UseCase_ItemValue_Delete {
  protected variant: TypeOfVariants = VARIANTS_OF_ITEM_VALUE.Payment;
}