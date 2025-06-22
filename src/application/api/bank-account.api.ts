import BankAccountUseCases from "@core/facades/bank-account.use_cases";
import BankAccountDrizzleRepository from "@src/infrastructure/repositories/bank_account.repository";
import BankAccountTransferMethodDrizzleRepository from "@src/infrastructure/repositories/bank_account_transfer_method.repository";
import TransferMethodDrizzleRepository from "@src/infrastructure/repositories/transfer_method_type.repository";

const BankAccountApi = new BankAccountUseCases(
  new BankAccountDrizzleRepository(),
  new TransferMethodDrizzleRepository(),
  new BankAccountTransferMethodDrizzleRepository()
);

export default BankAccountApi;