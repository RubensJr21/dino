import { RecurrenceType } from "@lib/types";
import { faker } from "@utils/factories/_faker";

function makeRecurrenceType(v: unknown, index: number): RecurrenceType {
  return {
    id: index,
    code: faker.helpers.arrayElement(["Mês", "Ano"]),
  };
}

export const list_of_recurrence_type = faker.helpers.multiple(makeRecurrenceType, {
  count: {
    min: 1,
    max: 3
  }
})