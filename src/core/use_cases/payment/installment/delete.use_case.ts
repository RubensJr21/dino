import DeleteInstallment from "@src/core/shared/factory_use_case_items/installment/delete"
import { TypeOfVariants, VARIANTS_OF_ITEM_VALUE } from "@src/core/shared/types/variants_items"

export default class DeleteInstallmentPayment extends DeleteInstallment {
  protected variant: TypeOfVariants = VARIANTS_OF_ITEM_VALUE.Payment
}