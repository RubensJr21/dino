import { IRepoRecurring } from "@src/core/shared/interfaces/IRepositoryRecurring";
import RecurringReceiptUpdateCurrentAmount from "@src/core/use_cases/receipt/recurring/current_amount_update.use_case";
import RecurringReceipt_Delete from "@src/core/use_cases/receipt/recurring/delete.use_case";
import RecurringReceiptDisable from "@src/core/use_cases/receipt/recurring/disable.use_case";
import RecurringReceiptEnable from "@src/core/use_cases/receipt/recurring/enable.use_case";
import RecurringReceipt_FindById from "@src/core/use_cases/receipt/recurring/find_by_id.use_case";
import RecurringReceipt_ListAll from "@src/core/use_cases/receipt/recurring/list_all.use_case";
import RecurringReceiptItemValue_MarkAsProcessed from "@src/core/use_cases/receipt/recurring/mark_item_value_as_processed.use_case";
import RecurringReceiptItemValue_MarkAsUnprocessed from "@src/core/use_cases/receipt/recurring/mark_item_value_as_unprocessed.use_case";
import RecurringReceipt_Register from "@src/core/use_cases/receipt/recurring/register.use_case";
import RecurringReceipt_Update from "@src/core/use_cases/receipt/recurring/update.use_case";
import { IRepoItemValue } from "@src/infrastructure/repositories/item_value.repository";

export default class ReceiptRecurringUseCases {
  public readonly register: RecurringReceipt_Register;
  public readonly delete: RecurringReceipt_Delete;
  public readonly find_by_id: RecurringReceipt_FindById;
  public readonly list_all: RecurringReceipt_ListAll;
  public readonly mark_as_processed: RecurringReceiptItemValue_MarkAsProcessed;
  public readonly mark_as_unprocessed: RecurringReceiptItemValue_MarkAsUnprocessed;
  public readonly update: RecurringReceipt_Update;
  public readonly enable: RecurringReceiptEnable;
  public readonly disable: RecurringReceiptDisable;
  public readonly update_current_amount: RecurringReceiptUpdateCurrentAmount;

  /**
   * Initializes use cases for recurring receipt operations
   * @param {IRepoRecurring} repo - Repository for recurring
   * @param {IRepoItemValue} repo_biv - Item value repository
   * @description Constructs instances of use cases for registering, deleting, and finding recurring receipt items
   */
  constructor(repo: IRepoRecurring, repo_biv: IRepoItemValue) {
    this.register = new RecurringReceipt_Register(repo);
    this.delete = new RecurringReceipt_Delete(repo_biv, repo);
    this.find_by_id = new RecurringReceipt_FindById(repo);
    this.list_all = new RecurringReceipt_ListAll(repo);
    this.mark_as_processed = new RecurringReceiptItemValue_MarkAsProcessed(repo);
    this.mark_as_unprocessed = new RecurringReceiptItemValue_MarkAsUnprocessed(repo);
    this.update = new RecurringReceipt_Update(repo);
    this.enable = new RecurringReceiptEnable(repo);
    this.disable = new RecurringReceiptDisable(repo);
    this.update_current_amount = new RecurringReceiptUpdateCurrentAmount(repo);
  }
}