import { TypeOfVariants, VARIANTS_OF_ITEM_VALUE } from "@core-types/variants_items";
import ListAllStandards from "@core/factory_use_case_items/standard/list_all";

export default class ListAllStandardPayments extends ListAllStandards {
  protected variant: TypeOfVariants = VARIANTS_OF_ITEM_VALUE.Payment;
}