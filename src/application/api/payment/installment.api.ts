import PaymentInstallmentUseCases from "@src/core/facades/payment/installment.use_cases";
import InstallmentDrizzleRepository from "@src/infrastructure/repositories/installment.repository";
import ItemValueDrizzleRepository from "@src/infrastructure/repositories/item_value.repository";

const PaymentInstallmentApi = new PaymentInstallmentUseCases(
  new InstallmentDrizzleRepository(),
  new ItemValueDrizzleRepository(),
);

export default PaymentInstallmentApi;