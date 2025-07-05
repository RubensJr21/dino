import UseCase_Installment_Update from "@src/core/shared/factory_use_case_items/installment/register";
import { TypeOfVariants, VARIANTS_OF_ITEM_VALUE } from "@src/core/shared/types/variants_items";

export default class InstallmentReceipt_Update extends UseCase_Installment_Update {
  protected variant: TypeOfVariants = VARIANTS_OF_ITEM_VALUE.Receipt;
}