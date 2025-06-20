import ReceiptInstallmentUseCases from "@src/core/facades/receipt/installment_item_value.use_cases";
import InstallmentItemValueDrizzleRepository from "@src/infrastructure/repositories/installment.repository";
import BaseItemValueDrizzleRepository from "@src/infrastructure/repositories/item_value.repository";

const ReceiptInstallmentApi = new ReceiptInstallmentUseCases(
  new InstallmentItemValueDrizzleRepository(),
  new BaseItemValueDrizzleRepository(),
);

export default ReceiptInstallmentApi;