import ReceiptRecurringUseCases from "@src/core/facades/receipt/recurring.use_cases";
import ItemValueDrizzleRepository from "@src/infrastructure/repositories/item_value.repository";
import RecurringDrizzleRepository from "@src/infrastructure/repositories/recurring.repository";

const ReceiptRecurringApi = new ReceiptRecurringUseCases(
  new RecurringDrizzleRepository(),
  new ItemValueDrizzleRepository(),
);

export default ReceiptRecurringApi;