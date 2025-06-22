import UseCase_ItemValue_Delete from "@src/core/shared/factory_use_case_items/standard/delete";
import { TypeOfVariants } from "@src/core/shared/types/variants_items";

export default class Payment_Delete extends UseCase_ItemValue_Delete {
  protected variant: TypeOfVariants = "Payment";
}