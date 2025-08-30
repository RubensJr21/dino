import { TypeOfVariants, VARIANTS_OF_ITEM_VALUE } from "@core-types/variants_items";
import ListAllInstallments from "@core/factory_use_case_items/installment/list_all";

export default class ListAllInstallmentReceipts extends ListAllInstallments {
  protected variant: TypeOfVariants = VARIANTS_OF_ITEM_VALUE.Receipt;
}