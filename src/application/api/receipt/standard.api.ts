import { IRepoItemValue } from "@src/core/shared/interfaces/IRepoItemValue";
import { IRepoStandard } from "@src/core/shared/interfaces/IRepoStandard";
import Receipt_Delete from "@src/core/use_cases/receipt/standard/delete.use_case";
import Receipt_FindById from "@src/core/use_cases/receipt/standard/find_by_id.use_case";
import Receipt_ListAll from "@src/core/use_cases/receipt/standard/list_all.use_case";
import ReceiptItemValue_MarkAsProcessed from "@src/core/use_cases/receipt/standard/mark_as_processed.use_case";
import ReceiptItemValue_MarkAsUnprocessed from "@src/core/use_cases/receipt/standard/mark_as_unprocessed.use_case";
import Receipt_Register from "@src/core/use_cases/receipt/standard/register.use_case";
import Receipt_Update from "@src/core/use_cases/receipt/standard/update.use_case";

const ReceiptApi = {
  register(repo: IRepoStandard, repo_iv: IRepoItemValue) {
    return new Receipt_Register(repo, repo_iv);
  },
  delete(repo: IRepoStandard, repo_iv: IRepoItemValue) {
    return new Receipt_Delete(repo, repo_iv);
  },
  find_by_id(repo: IRepoStandard) {
    return new Receipt_FindById(repo);
  },
  list_all(repo: IRepoStandard) {
    return new Receipt_ListAll(repo);
  },
  mark_as_processed(repo: IRepoStandard, repo_iv: IRepoItemValue) {
    return new ReceiptItemValue_MarkAsProcessed(repo, repo_iv);
  },
  mark_as_unprocessed(repo: IRepoStandard, repo_iv: IRepoItemValue) {
    return new ReceiptItemValue_MarkAsUnprocessed(repo, repo_iv);
  },
  update(repo: IRepoStandard, repo_iv: IRepoItemValue) {
    return new Receipt_Update(repo, repo_iv);
  },
};

export default ReceiptApi;