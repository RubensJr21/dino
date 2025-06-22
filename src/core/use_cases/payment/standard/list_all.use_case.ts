import UseCase_ItemValue_ListAll from "@src/core/shared/factory_use_case_items/standard/list_all";
import { TypeOfVariants } from "@src/core/shared/types/variants_items";

export default class Payment_ListAll extends UseCase_ItemValue_ListAll {
  protected variant: TypeOfVariants = "Payment";
}