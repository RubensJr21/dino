import { IRepoRecurring } from "@src/core/shared/IRepositoryRecurring";
import RecurringReceipt_Delete from "@src/core/use_cases/receipt/recurring_item_value/delete.use_case";
import RecurringReceipt_FindById from "@src/core/use_cases/receipt/recurring_item_value/find_by_id.use_case";
import RecurringReceipt_ListAll from "@src/core/use_cases/receipt/recurring_item_value/list_all.use_case";
import RecurringReceipt_MarkAsProcessed from "@src/core/use_cases/receipt/recurring_item_value/mark_as_processed.use_case";
import RecurringReceipt_Register from "@src/core/use_cases/receipt/recurring_item_value/register.use_case";
import RecurringReceipt_UnmarkAsProcessed from "@src/core/use_cases/receipt/recurring_item_value/unmark_as_processed.use_case";
import RecurringReceipt_Update from "@src/core/use_cases/receipt/recurring_item_value/update.use_case";
import { IRepositoryItemValue } from "@src/infrastructure/repositories/item_value.repository";

export default class ReceiptRecurringUseCases {
  public readonly register: RecurringReceipt_Register;
  public readonly delete: RecurringReceipt_Delete;
  public readonly find_by_id: RecurringReceipt_FindById;
  public readonly list_all: RecurringReceipt_ListAll;
  public readonly mark_as_processed: RecurringReceipt_MarkAsProcessed;
  public readonly unmark_as_processed: RecurringReceipt_UnmarkAsProcessed;
  public readonly update: RecurringReceipt_Update;

  /**
   * Initializes use cases for recurring receipt operations
   * @param {IRepoRecurring} repo - Repository for recurring
   * @param {IRepositoryItemValue} repo_biv - Item value repository
   * @description Constructs instances of use cases for registering, deleting, and finding recurring receipt items
   */
  constructor(repo: IRepoRecurring, repo_biv: IRepositoryItemValue) {
    this.register = new RecurringReceipt_Register(repo);
    this.delete = new RecurringReceipt_Delete(repo_biv, repo);
    this.find_by_id = new RecurringReceipt_FindById(repo);
    this.list_all = new RecurringReceipt_ListAll(repo);
    this.mark_as_processed = new RecurringReceipt_MarkAsProcessed(repo);
    this.unmark_as_processed = new RecurringReceipt_UnmarkAsProcessed(repo);
    this.update = new RecurringReceipt_Update(repo);
  }
}