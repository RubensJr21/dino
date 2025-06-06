import PaymentUseCases from "@src/core/facades/payment/item_value.use_cases";
import BaseItemValueDrizzleRepository from "@src/infrastructure/repositories/drizzle/base_item_value.repository";
import ItemValueDrizzleRepository from "@src/infrastructure/repositories/drizzle/item_value.repository";

const PaymentApi = new PaymentUseCases(
  new ItemValueDrizzleRepository(),
  new BaseItemValueDrizzleRepository(),
);

export default PaymentApi;