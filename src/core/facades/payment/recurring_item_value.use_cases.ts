import RecurringPayment_Delete from "@src/core/use_cases/payment/recurring_item_value/delete.use_case";
import RecurringPayment_FindById from "@src/core/use_cases/payment/recurring_item_value/find_by_id.use_case";
import RecurringPayment_ListAll from "@src/core/use_cases/payment/recurring_item_value/list_all.use_case";
import RecurringPayment_MarkAsProcessed from "@src/core/use_cases/payment/recurring_item_value/mark_as_processed.use_case";
import RecurringPayment_Register from "@src/core/use_cases/payment/recurring_item_value/register.use_case";
import RecurringPayment_UnmarkAsProcessed from "@src/core/use_cases/payment/recurring_item_value/unmark_as_processed.use_case";
import RecurringPayment_Update from "@src/core/use_cases/payment/recurring_item_value/update.use_case";
import { IRepositoryBaseItemValue } from "@src/infrastructure/repositories/drizzle/base_item_value.repository";
import { IRepoRecurringItemValue } from "@src/infrastructure/repositories/drizzle/recurring_item_value.repository";

export default class PaymentRecurringUseCases {
  public readonly register: RecurringPayment_Register;
  public readonly delete: RecurringPayment_Delete;
  public readonly find_by_id: RecurringPayment_FindById;
  public readonly list_all: RecurringPayment_ListAll;
  public readonly mark_as_processed: RecurringPayment_MarkAsProcessed;
  public readonly unmark_as_processed: RecurringPayment_UnmarkAsProcessed;
  public readonly update: RecurringPayment_Update;

  /**
   * Initializes use cases for recurring payment operations
   * @param {IRepoRecurringItemValue} repo - Repository for recurring item values
   * @param {IRepositoryBaseItemValue} repo_biv - Base item value repository
   * @description Constructs instances of use cases for registering, deleting, and finding recurring payment items
   */
  constructor(repo: IRepoRecurringItemValue, repo_biv: IRepositoryBaseItemValue) {
    this.register = new RecurringPayment_Register(repo);
    this.delete = new RecurringPayment_Delete(repo_biv, repo);
    this.find_by_id = new RecurringPayment_FindById(repo);
    this.list_all = new RecurringPayment_ListAll(repo);
    this.mark_as_processed = new RecurringPayment_MarkAsProcessed(repo);
    this.unmark_as_processed = new RecurringPayment_UnmarkAsProcessed(repo);
    this.update = new RecurringPayment_Update(repo);
  }
}