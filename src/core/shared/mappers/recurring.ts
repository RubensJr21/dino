import { RecurrenceType } from "@src/core/entities/recurrence_type.entity";
import { IRecurring, Recurring } from "@src/core/entities/recurring.entity";
import { Tag } from "@src/core/entities/tag.entity";
import { TransferMethod } from "@src/core/entities/transfer_method.entity";

interface MapperInput extends StrictOmit<IRecurring, "tag" | "transfer_method" | "recurrence_type" | "end_date"> {
  id: number;
  created_at: Date;
  updated_at: Date;
  start_date: Date;
  end_date: Date | null;
  current_amount: number;
  tag: Tag["properties"];
  transfer_method: TransferMethod["properties"]
  recurrence_type: RecurrenceType["properties"];
}

export function recurring_mapper(input: MapperInput): Recurring {
  console.log(input)
  return new Recurring({
    ...input,
    end_date: input.end_date ?? undefined,
    tag: new Tag(input.tag),
    transfer_method: new TransferMethod(input.transfer_method),
    recurrence_type: new RecurrenceType(input.recurrence_type),
  })
}