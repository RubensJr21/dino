import UseCase_RecurringItemValue_FindById from "@src/core/shared/factory_use_case_items/recurring/find_by_id";
import { TypeOfVariants } from "@src/core/shared/types/variants_items";

export default class RecurringReceipt_FindById extends UseCase_RecurringItemValue_FindById {
  protected variant: TypeOfVariants = "Receipt";
}