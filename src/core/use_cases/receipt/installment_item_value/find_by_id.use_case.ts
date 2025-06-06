import UseCase_InstallmentItemValue_FindById from "@src/core/shared/factory_use_case_items/installment_item_value/find_by_id";
import { TypeOfVariants } from "@src/core/shared/types/variants_items";

export default class InstallmentReceipt_FindById extends UseCase_InstallmentItemValue_FindById {
  protected variant: TypeOfVariants = "Receipt"
}