import { ItemValue } from "@domain/entities/item_value.entity";
import { faker } from "@utils/factories/_faker";
import { list_of_tags } from "@utils/factories/tag.factory";
import { list_of_transfer_methods } from "@utils/factories/transfer_method.factory";

export function makeItemValue(v: unknown, index: number): ItemValue {
  const tagIndex = faker.number.int({ min: 0, max: list_of_tags.length - 1 })
  const transferMethodIndex = faker.number.int({ min: 0, max: list_of_transfer_methods.length - 1 })
  return new ItemValue({
    id: index,
    cashflow_type: faker.number.int({ min: 0, max: 1 }) as 0 | 1,
    scheduled_at: faker.date.future(),
    amount: faker.number.float({ min: 10, max: 1000, fractionDigits: 2 }),
    was_processed: faker.datatype.boolean(),
    transfer_method: list_of_transfer_methods[transferMethodIndex],
    tag: list_of_tags[tagIndex],
    created_at: faker.date.past(),
    updated_at: faker.date.recent(),
  });
}