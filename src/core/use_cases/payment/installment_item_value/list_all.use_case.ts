import UseCase_InstallmentItemValue_ListAll from "@src/core/shared/factory_use_case_items/installment_item_value/list_all";
import { TypeOfVariants } from "@src/core/shared/types/variants_items";

export default class InstallmentPayment_ListAll extends UseCase_InstallmentItemValue_ListAll {
  protected variant: TypeOfVariants = "Payment";
}