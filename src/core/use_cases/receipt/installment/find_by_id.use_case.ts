import UseCase_Installment_FindById from "@src/core/shared/factory_use_case_items/installment/find_by_id";
import { TypeOfVariants, VARIANTS_OF_ITEM_VALUE } from "@src/core/shared/types/variants_items";

export default class InstallmentReceipt_FindById extends UseCase_Installment_FindById {
  protected variant: TypeOfVariants = VARIANTS_OF_ITEM_VALUE.Receipt;
}