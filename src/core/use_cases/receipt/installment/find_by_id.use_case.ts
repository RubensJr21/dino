import FindInstallmentById from "@src/core/shared/factory_use_case_items/installment/find_by_id";
import { TypeOfVariants, VARIANTS_OF_ITEM_VALUE } from "@src/core/shared/types/variants_items";

export default class FindInstallmentReceiptById extends FindInstallmentById {
  protected variant: TypeOfVariants = VARIANTS_OF_ITEM_VALUE.Receipt;
}