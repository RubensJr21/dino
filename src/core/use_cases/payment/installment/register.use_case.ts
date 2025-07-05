import UseCase_Installment_Register from "@src/core/shared/factory_use_case_items/installment/register";
import { TypeOfVariants, VARIANTS_OF_ITEM_VALUE } from "@src/core/shared/types/variants_items";

export default class InstallmentPayment_Register extends UseCase_Installment_Register {
  protected variant: TypeOfVariants = VARIANTS_OF_ITEM_VALUE.Payment;
}