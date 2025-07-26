import ListAllStandards from "@src/core/shared/factory_use_case_items/standard/list_all";
import { TypeOfVariants, VARIANTS_OF_ITEM_VALUE } from "@src/core/shared/types/variants_items";

export default class ListAllPaymentsStandard extends ListAllStandards {
  protected variant: TypeOfVariants = VARIANTS_OF_ITEM_VALUE.Payment;
}