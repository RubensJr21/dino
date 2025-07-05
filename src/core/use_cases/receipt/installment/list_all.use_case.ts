import UseCase_Installment_ListAll from "@src/core/shared/factory_use_case_items/installment/list_all";
import { TypeOfVariants, VARIANTS_OF_ITEM_VALUE } from "@src/core/shared/types/variants_items";

export default class InstallmentReceipt_ListAll extends UseCase_Installment_ListAll {
  protected variant: TypeOfVariants = VARIANTS_OF_ITEM_VALUE.Receipt;
}