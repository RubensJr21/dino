import ReceiptUseCases from "@src/core/facades/receipt/standard.use_cases";
import ItemValueDrizzleRepository from "@src/infrastructure/repositories/item_value.repository";
import StandardDrizzleRepository from "@src/infrastructure/repositories/standard.repository";

const ReceiptApi = new ReceiptUseCases(
  new StandardDrizzleRepository(),
  new ItemValueDrizzleRepository(),
);

export default ReceiptApi;