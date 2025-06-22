import UseCase_RecurringItemValue_ListAll from "@src/core/shared/factory_use_case_items/recurring/list_all";
import { TypeOfVariants } from "@src/core/shared/types/variants_items";

export default class RecurringReceipt_ListAll extends UseCase_RecurringItemValue_ListAll {
  protected variant: TypeOfVariants = "Receipt";
}