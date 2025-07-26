import { IRepoItemValue } from "@src/core/shared/interfaces/IRepoItemValue";
import { IRepoStandard } from "@src/core/shared/interfaces/IRepoStandard";
import Payment_Delete from "@src/core/use_cases/payment/standard/delete.use_case";
import Payment_FindById from "@src/core/use_cases/payment/standard/find_by_id.use_case";
import Payment_ListAll from "@src/core/use_cases/payment/standard/list_all.use_case";
import PaymentItemValue_MarkAsProcessed from "@src/core/use_cases/payment/standard/mark_as_processed.use_case";
import PaymentItemValue_MarkAsUnprocessed from "@src/core/use_cases/payment/standard/mark_as_unprocessed.use_case";
import Payment_Register from "@src/core/use_cases/payment/standard/register.use_case";
import Payment_Update from "@src/core/use_cases/payment/standard/update.use_case";

const PaymentStandardApi = {
  register(repo: IRepoStandard, repo_iv: IRepoItemValue) {
    return new Payment_Register(repo, repo_iv);
  },
  delete(repo: IRepoStandard, repo_iv: IRepoItemValue) {
    return new Payment_Delete(repo, repo_iv);
  },
  find_by_id(repo: IRepoStandard) {
    return new Payment_FindById(repo);
  },
  list_all(repo: IRepoStandard) {
    return new Payment_ListAll(repo);
  },
  mark_as_processed(repo: IRepoStandard, repo_iv: IRepoItemValue) {
    return new PaymentItemValue_MarkAsProcessed(repo, repo_iv);
  },
  mark_as_unprocessed(repo: IRepoStandard, repo_iv: IRepoItemValue) {
    return new PaymentItemValue_MarkAsUnprocessed(repo, repo_iv);
  },
  update(repo: IRepoStandard, repo_iv: IRepoItemValue) {
    return new Payment_Update(repo, repo_iv);
  },
};

export default PaymentStandardApi;