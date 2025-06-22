import PaymentRecurringUseCases from "@src/core/facades/payment/recurring.use_cases";
import ItemValueDrizzleRepository from "@src/infrastructure/repositories/item_value.repository";
import RecurringDrizzleRepository from "@src/infrastructure/repositories/recurring.repository";

const PaymentRecurringApi = new PaymentRecurringUseCases(
  new RecurringDrizzleRepository(),
  new ItemValueDrizzleRepository(),
);

export default PaymentRecurringApi;