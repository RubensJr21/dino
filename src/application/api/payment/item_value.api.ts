import PaymentUseCases from "@src/core/facades/payment/item_value.use_cases";
import BaseItemValueDrizzleRepository from "@src/infrastructure/repositories/item_value.repository";
import ItemValueDrizzleRepository from "@src/infrastructure/repositories/standard.repository";

const PaymentApi = new PaymentUseCases(
  new ItemValueDrizzleRepository(),
  new BaseItemValueDrizzleRepository(),
);

export default PaymentApi;