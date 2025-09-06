import { TransferMethod } from "@domain/entities/transfer_method.entity";
import { faker } from "@utils/factories/_faker";

function makeTransferMethod(): TransferMethod {
  return new TransferMethod({
    id: faker.number.int({ min: 1, max: 9999 }),
    method: faker.finance.transactionType(),
  });
}

const list = faker.helpers.multiple(makeTransferMethod, {
  count: {
    min: 5,
    max: 15
  }
})

const withoutDuplicates = new Set<TransferMethod["method"]>();

export const list_of_transfer_methods = list.filter(tm => {
  const duplicate = withoutDuplicates.has(tm.method)
  withoutDuplicates.add(tm.method)
  return !duplicate
})