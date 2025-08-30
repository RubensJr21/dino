import { Recurring } from "@domain/entities/recurring.entity";
import { faker } from "@utils/factories/_faker";
import { generatePaymentDescription } from "@utils/factories/_generate_Description";
import { list_of_recurrence_type } from "@utils/factories/recurrence_type.factory";
import { list_of_tags } from "@utils/factories/tag.factory";
import { list_of_transfer_methods } from "@utils/factories/transfer_method.factory";

export function makeRecurring(v: unknown, index: number): Recurring {
  const tagIndex = faker.number.int({ min: 0, max: list_of_tags.length - 1 })
  const transferMethodIndex = faker.number.int({ min: 0, max: list_of_transfer_methods.length - 1 })
  const recurrenceTypeIndex = faker.number.int({ min: 0, max: list_of_recurrence_type.length - 1 })
  return new Recurring({
    id: index,
    description: generatePaymentDescription(),
    start_date: faker.date.past(),
    end_date: faker.datatype.boolean() ? faker.date.future() : undefined,
    current_amount: faker.number.float({ min: 50, max: 2000, fractionDigits: 2 }),
    tag: list_of_tags[tagIndex],
    transfer_method: list_of_transfer_methods[transferMethodIndex],
    recurrence_type: list_of_recurrence_type[recurrenceTypeIndex],
    created_at: faker.date.past(),
    updated_at: faker.date.recent(),
  });
}

export const list_of_recurrings = faker.helpers.multiple(makeRecurring, {
  count: {
    min: 5,
    max: 15
  }
})