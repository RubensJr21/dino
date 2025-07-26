import { IRepoItemValue } from "@src/core/shared/interfaces/IRepoItemValue";
import { IRepoRecurring } from "@src/core/shared/interfaces/IRepoRecurring";
import RecurringPayment_Delete from "@src/core/use_cases/payment/recurring/delete.use_case";
import RecurringPaymentDisable from "@src/core/use_cases/payment/recurring/disable.use_case";
import RecurringPaymentEnable from "@src/core/use_cases/payment/recurring/enable.use_case";
import RecurringPayment_FindById from "@src/core/use_cases/payment/recurring/find_by_id.use_case";
import RecurringPayment_ListAll from "@src/core/use_cases/payment/recurring/list_all.use_case";
import RecurringPaymentItemValue_MarkAsProcessed from "@src/core/use_cases/payment/recurring/mark_item_value_as_processed.use_case";
import RecurringPaymentItemValue_MarkAsUnprocessed from "@src/core/use_cases/payment/recurring/mark_item_value_as_unprocessed.use_case";
import RecurringPayment_Register from "@src/core/use_cases/payment/recurring/register.use_case";
import RecurringPayment_Update from "@src/core/use_cases/payment/recurring/update.use_case";

const PaymentRecurringApi = {
  register(repo: IRepoRecurring) {
    return new RecurringPayment_Register(repo);
  },
  delete(repo: IRepoRecurring, repo_biv: IRepoItemValue) {
    return new RecurringPayment_Delete(repo_biv, repo);
  },
  find_by_id(repo: IRepoRecurring) {
    return new RecurringPayment_FindById(repo);
  },
  list_all(repo: IRepoRecurring) {
    return new RecurringPayment_ListAll(repo);
  },
  mark_as_processed(repo: IRepoRecurring, repo_biv: IRepoItemValue) {
    return new RecurringPaymentItemValue_MarkAsProcessed(repo, repo_biv);
  },
  mark_as_unprocessed(repo: IRepoRecurring, repo_biv: IRepoItemValue) {
    return new RecurringPaymentItemValue_MarkAsUnprocessed(repo, repo_biv);
  },
  update(repo: IRepoRecurring) {
    return new RecurringPayment_Update(repo);
  },
  enable(repo: IRepoRecurring) {
    return new RecurringPaymentEnable(repo);
  },
  disable(repo: IRepoRecurring) {
    return new RecurringPaymentDisable(repo);
  },
};

export default PaymentRecurringApi;