import { TypeOfVariants, VARIANTS_OF_ITEM_VALUE } from "@core-types/variants_items";
import RegisterInstallment from "@core/factory_use_case_items/installment/register";

export default class RegisterInstallmentReceipt extends RegisterInstallment {
  protected variant: TypeOfVariants = VARIANTS_OF_ITEM_VALUE.Receipt;
}