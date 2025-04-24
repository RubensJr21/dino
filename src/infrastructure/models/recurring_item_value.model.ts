import { RecurrenceType } from "@src/core/entities/recurrence_type.entity";
import { MBaseItemValue } from "./base_item_value.model";

export interface MRecurringItemValue extends MBaseItemValue {
  id: number;
  is_disabled: boolean;
  recurrence_type_id: RecurrenceType["id"];
}