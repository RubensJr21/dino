import ReceiptUseCases from "@src/core/facades/receipt/item_value.use_cases";
import BaseItemValueDrizzleRepository from "@src/infrastructure/repositories/drizzle/base_item_value.repository";
import ItemValueDrizzleRepository from "@src/infrastructure/repositories/drizzle/item_value.repository";

const ReceiptApi = new ReceiptUseCases(
  new ItemValueDrizzleRepository(),
  new BaseItemValueDrizzleRepository(),
);

export default ReceiptApi;