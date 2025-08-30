import { TransferMethod } from "@domain/entities/transfer_method.entity";
import { faker } from "@utils/factories/_faker";

function makeTransferMethod(): TransferMethod {
  return new TransferMethod({
    id: faker.number.int({ min: 1, max: 9999 }),
    method: faker.finance.transactionType(),
  });
}

export const list_of_transfer_methods = faker.helpers.multiple(makeTransferMethod, {
  count: {
    min: 2,
    max: 10
  }
})