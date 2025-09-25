import { IRecurring, Recurring } from "@domain/entities/recurring.entity";
import { Tag } from "@domain/entities/tag.entity";
import { TransferMethod } from "@domain/entities/transfer_method.entity";
import { RecurrenceType } from "@lib/types";

interface MapperInput extends StrictOmit<IRecurring, "tag" | "transfer_method" | "recurrence_type" | "end_date" | "is_disabled"> {
  id: number;
  description: string;
  created_at: Date;
  updated_at: Date;
  start_date: Date;
  end_date: Date | null;
  current_amount: number;
  tag: Tag["properties"];
  transfer_method: TransferMethod["properties"]
  recurrence_type: RecurrenceType;
}

export function recurring_mapper(input: MapperInput): Recurring {
  return new Recurring({
    ...input,
    end_date: input.end_date ?? undefined,
    tag: new Tag(input.tag),
    transfer_method: new TransferMethod(input.transfer_method),
    recurrence_type: input.recurrence_type,
  })
}