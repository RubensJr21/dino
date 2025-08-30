import { Tag } from "@domain/entities/tag.entity";
import { faker } from "@utils/factories/_faker";

function makeTag(): Tag {
  return new Tag({
    id: faker.number.int({ min: 1, max: 9999 }),
    description: faker.commerce.department(),
  });
}

export const list_of_tags = faker.helpers.multiple(makeTag, {
  count: {
    min: 5,
    max: 15
  }
})