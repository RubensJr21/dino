import UseCase_InstallmentItemValue_Delete from "@src/core/shared/factory_use_case_items/installment_item_value/delete"
import { TypeOfVariants } from "@src/core/shared/types/variants_items"

export default class InstallmentReceipt_Delete extends UseCase_InstallmentItemValue_Delete {
  protected variant: TypeOfVariants = "Receipt"
}