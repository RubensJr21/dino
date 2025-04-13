import { BaseItemValue } from "./base_item_value.entity";
import { RecurrenceType } from "./recurrence_type.entity";

export interface RecurringItemValue {
    readonly id: number;
    is_disabled: boolean;
    recurrence_type: RecurrenceType;
    base_item_value: BaseItemValue;
}