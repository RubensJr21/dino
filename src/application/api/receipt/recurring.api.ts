import { IRepoItemValue } from "@src/core/shared/interfaces/IRepoItemValue";
import { IRepoRecurring } from "@src/core/shared/interfaces/IRepoRecurring";
import RecurringReceipt_Delete from "@src/core/use_cases/receipt/recurring/delete.use_case";
import RecurringReceiptDisable from "@src/core/use_cases/receipt/recurring/disable.use_case";
import RecurringReceiptEnable from "@src/core/use_cases/receipt/recurring/enable.use_case";
import RecurringReceipt_FindById from "@src/core/use_cases/receipt/recurring/find_by_id.use_case";
import RecurringReceipt_ListAll from "@src/core/use_cases/receipt/recurring/list_all.use_case";
import RecurringReceiptItemValue_MarkAsProcessed from "@src/core/use_cases/receipt/recurring/mark_item_value_as_processed.use_case";
import RecurringReceiptItemValue_MarkAsUnprocessed from "@src/core/use_cases/receipt/recurring/mark_item_value_as_unprocessed.use_case";
import RecurringReceipt_Register from "@src/core/use_cases/receipt/recurring/register.use_case";
import RecurringReceipt_Update from "@src/core/use_cases/receipt/recurring/update.use_case";

const ReceiptRecurringApi = {
  register(repo: IRepoRecurring) {
    return new RecurringReceipt_Register(repo); 
  },
  delete(repo: IRepoRecurring, repo_biv: IRepoItemValue) {
    return new RecurringReceipt_Delete(repo_biv, repo); 
  },
  find_by_id(repo: IRepoRecurring) {
    return new RecurringReceipt_FindById(repo); 
  },
  list_all(repo: IRepoRecurring) {
    return new RecurringReceipt_ListAll(repo); 
  },
  mark_as_processed(repo: IRepoRecurring, repo_biv: IRepoItemValue) {
    return new RecurringReceiptItemValue_MarkAsProcessed(repo, repo_biv); 
  },
  mark_as_unprocessed(repo: IRepoRecurring, repo_biv: IRepoItemValue) {
    return new RecurringReceiptItemValue_MarkAsUnprocessed(repo, repo_biv); 
  },
  update(repo: IRepoRecurring) {
    return new RecurringReceipt_Update(repo); 
  },
  enable(repo: IRepoRecurring) {
    return new RecurringReceiptEnable(repo); 
  },
  disable(repo: IRepoRecurring) {
    return new RecurringReceiptDisable(repo); 
  },
};

export default ReceiptRecurringApi;