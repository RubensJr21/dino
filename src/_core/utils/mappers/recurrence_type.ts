import { IRecurrenceType, RecurrenceType } from "@domain/entities/recurrence_type.entity";

type MapperInput = IRecurrenceType

export function recurrence_type_mapper(input: MapperInput): RecurrenceType {
  return new RecurrenceType(input)
}