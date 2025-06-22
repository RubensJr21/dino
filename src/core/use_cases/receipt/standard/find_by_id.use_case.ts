import UseCase_ItemValue_FindById from "@src/core/shared/factory_use_case_items/standard/find_by_id";
import { TypeOfVariants } from "@src/core/shared/types/variants_items";

export default class Receipt_FindById extends UseCase_ItemValue_FindById {
  protected variant: TypeOfVariants = "Receipt";
}