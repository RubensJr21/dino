import { IRepoInstallment } from "@src/core/shared/interfaces/IRepoInstallment";
import { IRepoItemValue } from "@src/core/shared/interfaces/IRepoItemValue";
import InstallmentPayment_Delete from "@src/core/use_cases/payment/installment/delete.use_case";
import InstallmentPayment_FindById from "@src/core/use_cases/payment/installment/find_by_id.use_case";
import InstallmentPayment_ListAll from "@src/core/use_cases/payment/installment/list_all.use_case";
import InstallmentPaymentItemValue_MarkAsProcessed from "@src/core/use_cases/payment/installment/mark_item_value_as_processed.use_case";
import InstallmentPaymentItemValue_MarkAsUnprocessed from "@src/core/use_cases/payment/installment/mark_item_value_as_unprocessed.use_case";
import InstallmentPayment_Register from "@src/core/use_cases/payment/installment/register.use_case";
import InstallmentPayment_Update from "@src/core/use_cases/payment/installment/update.use_case";

const PaymentInstallmentApi = {
  register(repo: IRepoInstallment) {
    return new InstallmentPayment_Register(repo);
  },
  delete(repo: IRepoInstallment, repo_biv: IRepoItemValue) {
    return new InstallmentPayment_Delete(repo_biv, repo);
  },
  find_by_id(repo: IRepoInstallment) {
    return new InstallmentPayment_FindById(repo);
  },
  list_all(repo: IRepoInstallment) {
    return new InstallmentPayment_ListAll(repo);
  },
  mark_as_processed(repo: IRepoInstallment, repo_biv: IRepoItemValue) {
    return new InstallmentPaymentItemValue_MarkAsProcessed(repo, repo_biv);
  },
  mark_as_unprocessed(repo: IRepoInstallment, repo_biv: IRepoItemValue) {
    return new InstallmentPaymentItemValue_MarkAsUnprocessed(repo, repo_biv);
  },
  update(repo: IRepoInstallment) {
    return new InstallmentPayment_Update(repo);
  },
  // Por enquanto não estará habilitado
  // update_item(repo: IRepoInstallment, repo_iv: IRepoItemValue){
  //   return new InstallmentPayment_UpdateItem(repo, repo_iv);
  // }
};

export default PaymentInstallmentApi;