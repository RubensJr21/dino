import { Standard } from "@domain/entities/standard.entity";
import { faker } from "@utils/factories/_faker";
import { generatePaymentDescription } from "@utils/factories/_generate_Description";
import { makeItemValue } from "@utils/factories/item_value.factory";

export function makeStandard(v: unknown, index: number): Standard {
  return new Standard({
    id: index,
    description: generatePaymentDescription(),
    item_value: makeItemValue("", index),
    created_at: faker.date.past(),
    updated_at: faker.date.recent(),
  });
}

export const list_of_standards = faker.helpers.multiple(makeStandard, {
  count:  {
    min: 5,
    max: 15
  }
})