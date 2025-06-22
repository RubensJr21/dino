import UseCase_Installment_Update from "@src/core/shared/factory_use_case_items/installment/register";
import { TypeOfVariants } from "@src/core/shared/types/variants_items";

export default class InstallmentReceipt_Update extends UseCase_Installment_Update {
  protected variant: TypeOfVariants = "Receipt";
}