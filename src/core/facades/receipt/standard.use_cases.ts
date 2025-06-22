import { IRepoStandard } from "@src/core/shared/interfaces/IRepositoryStandard";
import Receipt_Delete from "@src/core/use_cases/receipt/standard/delete.use_case";
import Receipt_FindById from "@src/core/use_cases/receipt/standard/find_by_id.use_case";
import Receipt_ListAll from "@src/core/use_cases/receipt/standard/list_all.use_case";
import ReceiptItemValue_MarkAsProcessed from "@src/core/use_cases/receipt/standard/mark_as_processed.use_case";
import ReceiptItemValue_MarkAsUnprocessed from "@src/core/use_cases/receipt/standard/mark_as_unprocessed.use_case";
import Receipt_Register from "@src/core/use_cases/receipt/standard/register.use_case";
import Receipt_Update from "@src/core/use_cases/receipt/standard/update.use_case";
import { IRepoItemValue } from "@src/infrastructure/repositories/item_value.repository";

export default class ReceiptUseCases {
  public readonly register: Receipt_Register;
  public readonly delete: Receipt_Delete;
  public readonly find_by_id: Receipt_FindById;
  public readonly list_all: Receipt_ListAll;
  public readonly mark_as_processed: ReceiptItemValue_MarkAsProcessed;
  public readonly mark_as_unprocessed: ReceiptItemValue_MarkAsUnprocessed;
  public readonly update: Receipt_Update;

  /**
   * Initializes use cases for receipt operations
   * @param {IRepoItemValue} repo - Repository for item values
   * @param {IRepoStandard} repo_iv - Item value repository
   * @description Constructs instances of use cases for registering, deleting, and finding receipt items
   */
  constructor(repo: IRepoStandard, repo_iv: IRepoItemValue) {
    this.register = new Receipt_Register(repo);
    this.delete = new Receipt_Delete(repo, repo_iv);
    this.find_by_id = new Receipt_FindById(repo);
    this.list_all = new Receipt_ListAll(repo);
    this.mark_as_processed = new ReceiptItemValue_MarkAsProcessed(repo, repo_iv);
    this.mark_as_unprocessed = new ReceiptItemValue_MarkAsUnprocessed(repo, repo_iv);
    this.update = new Receipt_Update(repo);
  }
}