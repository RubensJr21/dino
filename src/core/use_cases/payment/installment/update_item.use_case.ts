import UseCase_Installment_UpdateItem from "@src/core/shared/factory_use_case_items/installment/update_item";
import { TypeOfVariants } from "@src/core/shared/types/variants_items";

export default class InstallmentPayment_UpdateItem extends UseCase_Installment_UpdateItem {
  protected variant: TypeOfVariants = "Payment";
}