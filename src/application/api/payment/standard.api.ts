import PaymentUseCases from "@src/core/facades/payment/standard.use_cases";
import ItemValueDrizzleRepository from "@src/infrastructure/repositories/item_value.repository";
import StandardDrizzleRepository from "@src/infrastructure/repositories/standard.repository";

const PaymentApi = new PaymentUseCases(
  new StandardDrizzleRepository(),
  new ItemValueDrizzleRepository(),
);

export default PaymentApi;