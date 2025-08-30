import { RecurrenceType } from "@domain/entities/recurrence_type.entity";
import { faker } from "@utils/factories/_faker";

function makeRecurrenceType(v: unknown, index: number): RecurrenceType {
  return new RecurrenceType({
    id: index,
    type: faker.helpers.arrayElement(["monthly", "yearly"]),
  });
}

export const list_of_recurrence_type = faker.helpers.multiple(makeRecurrenceType, {
  count: {
    min: 1,
    max: 3
  }
})