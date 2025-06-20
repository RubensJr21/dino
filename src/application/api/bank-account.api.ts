import BankAccountUseCases from "@core/facades/bank-account.use_cases";
import BankAccountDrizzleRepository from "@src/infrastructure/repositories/bank_account.repository";
import BankAccountTransferMethodDrizzleRepository from "@src/infrastructure/repositories/bank_account_transfer_method.repository";

const BankAccountApi = new BankAccountUseCases(
  new BankAccountDrizzleRepository(),
  new BankAccountTransferMethodDrizzleRepository()
);

export default BankAccountApi;