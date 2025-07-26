import { RecurrenceType } from "@src/core/entities/recurrence_type.entity";
import { IRecurring, Recurring } from "@src/core/entities/recurring.entity";

interface MapperInput extends StrictOmit<IRecurring, "recurrence_type" | "end_date"> {
  id: number;
  created_at: Date;
  updated_at: Date;
  start_date: Date;
  end_date: Date | null;
  current_amount: number;
  recurrence_type: {
    id: number;
    type: string;
  };
}

export function recurring_mapper(input: MapperInput): Recurring {
  return new Recurring({
    ...input,
    end_date: input.end_date ?? undefined,
    recurrence_type: new RecurrenceType(input.recurrence_type),
  })
}