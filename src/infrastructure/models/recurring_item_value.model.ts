import { MBaseItemValue } from "./base_item_value.model";
import { MRecurrenceType } from "./recurrence_type.model";

export interface MRecurringItemValue extends MBaseItemValue {
  id: number;
  is_disabled: boolean;
  fk_id_recurrence_type: MRecurrenceType["id"];
}