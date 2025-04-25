import { MBaseItemValue } from "./base_item_value.model";
import { MRecurrenceType } from "./recurrence_type.model";

export interface MRecurringItemValue extends MBaseItemValue {
  id: number;
  is_disabled: boolean;
  recurrence_type_id: MRecurrenceType["id"];
}