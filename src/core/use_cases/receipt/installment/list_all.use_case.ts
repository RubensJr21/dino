import UseCase_Installment_ListAll from "@src/core/shared/factory_use_case_items/installment/list_all";
import { TypeOfVariants } from "@src/core/shared/types/variants_items";

export default class InstallmentReceipt_ListAll extends UseCase_Installment_ListAll {
  protected variant: TypeOfVariants = "Receipt";
}