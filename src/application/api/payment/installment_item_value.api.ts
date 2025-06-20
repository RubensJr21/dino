import PaymentInstallmentUseCases from "@src/core/facades/payment/installment_item_value.use_cases";
import InstallmentItemValueDrizzleRepository from "@src/infrastructure/repositories/installment.repository";
import BaseItemValueDrizzleRepository from "@src/infrastructure/repositories/item_value.repository";

const PaymentInstallmentApi = new PaymentInstallmentUseCases(
  new InstallmentItemValueDrizzleRepository(),
  new BaseItemValueDrizzleRepository(),
);

export default PaymentInstallmentApi;