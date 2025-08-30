import { TypeOfVariants, VARIANTS_OF_ITEM_VALUE } from "@core-types/variants_items";
import ListAllInstallment from "@core/factory_use_case_items/installment/list_all";

export default class ListAllInstallmentsPayment extends ListAllInstallment {
  protected variant: TypeOfVariants = VARIANTS_OF_ITEM_VALUE.Payment;
}