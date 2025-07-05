import UseCase_Installment_Delete from "@src/core/shared/factory_use_case_items/installment/delete"
import { TypeOfVariants, VARIANTS_OF_ITEM_VALUE } from "@src/core/shared/types/variants_items"

export default class InstallmentPayment_Delete extends UseCase_Installment_Delete {
  protected variant: TypeOfVariants = VARIANTS_OF_ITEM_VALUE.Payment
}