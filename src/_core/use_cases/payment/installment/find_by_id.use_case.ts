import { TypeOfVariants, VARIANTS_OF_ITEM_VALUE } from "@core-types/variants_items";
import FindInstallmentById from "@core/factory_use_case_items/installment/find_by_id";

export default class FindInstallmentPaymentById extends FindInstallmentById {
  protected variant: TypeOfVariants = VARIANTS_OF_ITEM_VALUE.Payment
}