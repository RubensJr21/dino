import ReceiptInstallmentUseCases from "@src/core/facades/receipt/installment_item_value.use_cases";
import BaseItemValueDrizzleRepository from "@src/infrastructure/repositories/drizzle/base_item_value.repository";
import InstallmentItemValueDrizzleRepository from "@src/infrastructure/repositories/drizzle/installment_item_value.repository";

const ReceiptInstallmentApi = new ReceiptInstallmentUseCases(
  new InstallmentItemValueDrizzleRepository(),
  new BaseItemValueDrizzleRepository(),
);

export default ReceiptInstallmentApi;