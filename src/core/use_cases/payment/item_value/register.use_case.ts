import UseCase_ItemValue_Register from "@src/core/shared/factory_use_case_items/item_value/register";
import { TypeOfVariants } from "@src/core/shared/types/variants_items";

export default class Payment_Register extends UseCase_ItemValue_Register {
  protected variant: TypeOfVariants = "Payment";
}