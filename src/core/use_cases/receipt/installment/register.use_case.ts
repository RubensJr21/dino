import UseCase_Installment_Register from "@src/core/shared/factory_use_case_items/installment/register";
import { TypeOfVariants } from "@src/core/shared/types/variants_items";

export default class InstallmentReceipt_Register extends UseCase_Installment_Register {
  protected variant: TypeOfVariants = "Receipt";
}