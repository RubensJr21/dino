import { Installment } from "@domain/entities/installment.entity";
import { faker } from "@utils/factories/_faker";
import { generatePaymentDescription } from "@utils/factories/_generate_Description";
import { list_of_tags } from "@utils/factories/tag.factory";
import { list_of_transfer_methods } from "@utils/factories/transfer_method.factory";

function makeInstallment(v: unknown, index: number): Installment {
  const tagIndex = faker.number.int({ min: 0, max: list_of_tags.length - 1 })
  const transferMethodIndex = faker.number.int({ min: 0, max: list_of_transfer_methods.length - 1 })
  return new Installment({
    id: index,
    description: generatePaymentDescription(),
    transfer_method: list_of_transfer_methods[transferMethodIndex],
    tag: list_of_tags[tagIndex],
    start_date: faker.date.past(),
    installments_number: faker.number.int({ min: 2, max: 24 }),
    total_amount: faker.number.float({ min: 100, max: 5000, fractionDigits: 2 }),
    created_at: faker.date.past(),
    updated_at: faker.date.recent(),
  });
}

export const list_of_installments = faker.helpers.multiple(makeInstallment, {
  count: {
    min: 5,
    max: 15
  }
})