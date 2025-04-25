import { ABaseItemValue } from "./base_item_value.entity";
import { IRecurrenceType } from "./recurrence_type.entity";

export interface IRecurringItemValue {
  readonly id: number;
  is_disabled: boolean;
  recurrence_type: IRecurrenceType;
  base_item_value: ABaseItemValue;
}