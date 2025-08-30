import { TypeOfVariants, VARIANTS_OF_ITEM_VALUE } from "@core-types/variants_items";
import UpdateInstallment from "@core/factory_use_case_items/installment/update";

export default class UpdateInstallmentPayment extends UpdateInstallment {
  protected variant: TypeOfVariants = VARIANTS_OF_ITEM_VALUE.Payment;
}