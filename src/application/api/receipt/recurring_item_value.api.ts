import ReceiptRecurringUseCases from "@src/core/facades/receipt/recurring_item_value.use_cases";
import BaseItemValueDrizzleRepository from "@src/infrastructure/repositories/item_value.repository";
import RecurringItemValueDrizzleRepository from "@src/infrastructure/repositories/recurring.repository";

const ReceiptRecurringApi = new ReceiptRecurringUseCases(
  new RecurringItemValueDrizzleRepository(),
  new BaseItemValueDrizzleRepository(),
);

export default ReceiptRecurringApi;