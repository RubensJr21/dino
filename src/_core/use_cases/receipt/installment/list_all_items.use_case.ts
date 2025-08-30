import { TypeOfVariants, VARIANTS_OF_ITEM_VALUE } from "@core-types/variants_items";
import ListAllItemValueInstallments from "@core/factory_use_case_items/installment/list_all_items";

export default class ListAllItemValueInstallmentReceipts extends ListAllItemValueInstallments {
  protected variant: TypeOfVariants = VARIANTS_OF_ITEM_VALUE.Receipt;
}