import ListAllItemValueInstallments from "@src/core/shared/factory_use_case_items/installment/list_all_items";
import { TypeOfVariants, VARIANTS_OF_ITEM_VALUE } from "@src/core/shared/types/variants_items";

export default class ListAllItemValueInstallmentPayments extends ListAllItemValueInstallments {
  protected variant: TypeOfVariants = VARIANTS_OF_ITEM_VALUE.Payment;
}