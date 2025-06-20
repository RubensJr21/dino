import { IRecurring } from "@src/core/entities/recurring.entity";
import { MRecurrenceType } from "./recurrence_type.model";

export interface MRecurring extends StrictOmit<IRecurring, "recurrence_type"> {
  fk_id_recurrence_type: MRecurrenceType["id"];
}