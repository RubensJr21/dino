import PaymentInstallmentUseCases from "@src/core/facades/payment/installment_item_value.use_cases";
import BaseItemValueDrizzleRepository from "@src/infrastructure/repositories/drizzle/base_item_value.repository";
import InstallmentItemValueDrizzleRepository from "@src/infrastructure/repositories/drizzle/installment_item_value.repository";

const PaymentInstallmentApi = new PaymentInstallmentUseCases(
  new InstallmentItemValueDrizzleRepository(),
  new BaseItemValueDrizzleRepository(),
);

export default PaymentInstallmentApi;