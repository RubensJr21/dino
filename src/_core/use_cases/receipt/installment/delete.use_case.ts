import { TypeOfVariants, VARIANTS_OF_ITEM_VALUE } from "@core-types/variants_items";
import DeleteInstallment from "@core/factory_use_case_items/installment/delete";

export default class DeleteInstallmentReceipt extends DeleteInstallment {
  protected variant: TypeOfVariants = VARIANTS_OF_ITEM_VALUE.Receipt;
}