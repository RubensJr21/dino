import Receipt_Delete from "@src/core/use_cases/receipt/item_value/delete.use_case";
import Receipt_FindById from "@src/core/use_cases/receipt/item_value/find_by_id.use_case";
import Receipt_ListAll from "@src/core/use_cases/receipt/item_value/list_all.use_case";
import Receipt_MarkAsProcessed from "@src/core/use_cases/receipt/item_value/mark_as_processed.use_case";
import Receipt_Register from "@src/core/use_cases/receipt/item_value/register.use_case";
import Receipt_UnmarkAsProcessed from "@src/core/use_cases/receipt/item_value/unmark_as_processed.use_case";
import Receipt_Update from "@src/core/use_cases/receipt/item_value/update.use_case";
import { IRepositoryItemValue } from "@src/infrastructure/repositories/item_value.repository";
import { IRepoItemValue } from "@src/infrastructure/repositories/standard.repository";

export default class ReceiptUseCases {
  public readonly register: Receipt_Register;
  public readonly delete: Receipt_Delete;
  public readonly find_by_id: Receipt_FindById;
  public readonly list_all: Receipt_ListAll;
  public readonly mark_as_processed: Receipt_MarkAsProcessed;
  public readonly unmark_as_processed: Receipt_UnmarkAsProcessed;
  public readonly update: Receipt_Update;

  /**
   * Initializes use cases for receipt operations
   * @param {IRepoItemValue} repo - Repository for item values
   * @param {IRepositoryItemValue} repo_iv - Item value repository
   * @description Constructs instances of use cases for registering, deleting, and finding receipt items
   */
  constructor(repo: IRepoItemValue, repo_iv: IRepositoryItemValue) {
    this.register = new Receipt_Register(repo);
    this.delete = new Receipt_Delete(repo_iv, repo);
    this.find_by_id = new Receipt_FindById(repo);
    this.list_all = new Receipt_ListAll(repo);
    this.mark_as_processed = new Receipt_MarkAsProcessed(repo);
    this.unmark_as_processed = new Receipt_UnmarkAsProcessed(repo);
    this.update = new Receipt_Update(repo);
  }
}