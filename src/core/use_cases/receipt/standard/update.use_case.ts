import UseCase_ItemValue_Update from "@src/core/shared/factory_use_case_items/standard/register";
import { TypeOfVariants } from "@src/core/shared/types/variants_items";

export default class Receipt_Update extends UseCase_ItemValue_Update {
  protected variant: TypeOfVariants = "Receipt";
}