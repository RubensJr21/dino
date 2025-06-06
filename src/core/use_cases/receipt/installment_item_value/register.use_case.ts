import UseCase_InstallmentItemValue_Register from "@src/core/shared/factory_use_case_items/installment_item_value/register";
import { TypeOfVariants } from "@src/core/shared/types/variants_items";

export default class InstallmentReceipt_Register extends UseCase_InstallmentItemValue_Register {
  protected variant: TypeOfVariants = "Receipt";
}