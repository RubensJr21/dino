import { TypeOfVariants, VARIANTS_OF_ITEM_VALUE } from "@core-types/variants_items";
import DeleteRecurring from "@core/factory_use_case_items/recurring/delete";

export default class DeleteRecurringPayment extends DeleteRecurring {
  protected variant: TypeOfVariants = VARIANTS_OF_ITEM_VALUE.Payment;
}