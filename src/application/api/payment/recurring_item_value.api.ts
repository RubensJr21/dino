import PaymentRecurringUseCases from "@src/core/facades/payment/recurring_item_value.use_cases";
import BaseItemValueDrizzleRepository from "@src/infrastructure/repositories/drizzle/base_item_value.repository";
import RecurringItemValueDrizzleRepository from "@src/infrastructure/repositories/drizzle/recurring_item_value.repository";

const PaymentRecurringApi = new PaymentRecurringUseCases(
  new RecurringItemValueDrizzleRepository(),
  new BaseItemValueDrizzleRepository(),
);

export default PaymentRecurringApi;