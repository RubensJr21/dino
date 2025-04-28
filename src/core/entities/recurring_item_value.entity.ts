import { ABaseItemValue } from "./base_item_value.entity";
import { RecurrenceType } from "./recurrence_type.entity";

export interface IRecurringItemValue {
  readonly id: number;
  is_disabled: boolean;
  recurrence_type: RecurrenceType;
  base_item_value: ABaseItemValue;
}