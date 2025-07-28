import { IRecurring } from "@src/core/entities/recurring.entity";
import { MRecurrenceType } from "./recurrence_type.model";
import { MTag } from "./tag.model";
import { MTransferMethod } from "./transfer_method.model";

export interface MRecurring extends StrictOmit<IRecurring, "tag" | "transfer_method" | "recurrence_type"> {
  fk_id_tag: MTag["id"];
  fk_id_transfer_method: MTransferMethod["id"];
  fk_id_recurrence_type: MRecurrenceType["id"];
}