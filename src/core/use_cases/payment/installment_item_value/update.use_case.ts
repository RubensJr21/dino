import UseCase_InstallmentItemValue_Update from "@src/core/shared/factory_use_case_items/installment_item_value/register";
import { TypeOfVariants } from "@src/core/shared/types/variants_items";

export default class InstallmentPayment_Update extends UseCase_InstallmentItemValue_Update {
  protected variant: TypeOfVariants = "Payment";
}