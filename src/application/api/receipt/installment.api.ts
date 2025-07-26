import { IRepoInstallment } from "@src/core/shared/interfaces/IRepoInstallment";
import { IRepoItemValue } from "@src/core/shared/interfaces/IRepoItemValue";
import InstallmentReceipt_Delete from "@src/core/use_cases/receipt/installment/delete.use_case";
import InstallmentReceipt_FindById from "@src/core/use_cases/receipt/installment/find_by_id.use_case";
import InstallmentReceipt_ListAll from "@src/core/use_cases/receipt/installment/list_all.use_case";
import InstallmentReceiptItemValue_MarkAsProcessed from "@src/core/use_cases/receipt/installment/mark_item_value_as_processed.use_case";
import InstallmentReceiptItemValue_MarkAsUnprocessed from "@src/core/use_cases/receipt/installment/mark_item_value_as_unprocessed.use_case";
import InstallmentReceipt_Register from "@src/core/use_cases/receipt/installment/register.use_case";
import InstallmentReceipt_Update from "@src/core/use_cases/receipt/installment/update.use_case";

const ReceiptInstallmentApi = {
  register(repo: IRepoInstallment) {
    return new InstallmentReceipt_Register(repo)
  },
  delete(repo: IRepoInstallment, repo_iv: IRepoItemValue) {
    return new InstallmentReceipt_Delete(repo_iv, repo)
  },
  find_by_id(repo: IRepoInstallment) {
    return new InstallmentReceipt_FindById(repo)
  },
  list_all(repo: IRepoInstallment) {
    return new InstallmentReceipt_ListAll(repo)
  },
  mark_as_processed(repo: IRepoInstallment, repo_iv: IRepoItemValue) {
    return new InstallmentReceiptItemValue_MarkAsProcessed(repo, repo_iv)
  },
  mark_as_unprocessed(repo: IRepoInstallment, repo_iv: IRepoItemValue) {
    return new InstallmentReceiptItemValue_MarkAsUnprocessed(repo, repo_iv)
  },
  update(repo: IRepoInstallment) {
    return new InstallmentReceipt_Update(repo)
  },
  // Por enquanto não estará habilitado
  // update_item(repo: IRepoInstallment, repo_iv: IRepoItemValue) {
  //   return new InstallmentReceipt_UpdateItem(repo, repo_iv)
  // },
};

export default ReceiptInstallmentApi;