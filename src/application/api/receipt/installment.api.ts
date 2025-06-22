import ReceiptInstallmentUseCases from "@src/core/facades/receipt/installment.use_cases";
import InstallmentDrizzleRepository from "@src/infrastructure/repositories/installment.repository";
import ItemValueDrizzleRepository from "@src/infrastructure/repositories/item_value.repository";

const ReceiptInstallmentApi = new ReceiptInstallmentUseCases(
  new InstallmentDrizzleRepository(),
  new ItemValueDrizzleRepository(),
);

export default ReceiptInstallmentApi;