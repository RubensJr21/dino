import { IRepoRecurring } from "@src/core/shared/interfaces/IRepositoryRecurring";
import RecurringPaymentUpdateCurrentAmount from "@src/core/use_cases/payment/recurring/current_amount_update.use_case";
import RecurringPayment_Delete from "@src/core/use_cases/payment/recurring/delete.use_case";
import RecurringPaymentDisable from "@src/core/use_cases/payment/recurring/disable.use_case";
import RecurringPaymentEnable from "@src/core/use_cases/payment/recurring/enable.use_case";
import RecurringPayment_FindById from "@src/core/use_cases/payment/recurring/find_by_id.use_case";
import RecurringPayment_ListAll from "@src/core/use_cases/payment/recurring/list_all.use_case";
import RecurringPaymentItemValue_MarkAsProcessed from "@src/core/use_cases/payment/recurring/mark_item_value_as_processed.use_case";
import RecurringPaymentItemValue_MarkAsUnprocessed from "@src/core/use_cases/payment/recurring/mark_item_value_as_unprocessed.use_case";
import RecurringPayment_Register from "@src/core/use_cases/payment/recurring/register.use_case";
import RecurringPayment_Update from "@src/core/use_cases/payment/recurring/update.use_case";
import { IRepoItemValue } from "@src/infrastructure/repositories/item_value.repository";

export default class PaymentRecurringUseCases {
  public readonly register: RecurringPayment_Register;
  public readonly delete: RecurringPayment_Delete;
  public readonly find_by_id: RecurringPayment_FindById;
  public readonly list_all: RecurringPayment_ListAll;
  public readonly mark_as_processed: RecurringPaymentItemValue_MarkAsProcessed;
  public readonly mark_as_unprocessed: RecurringPaymentItemValue_MarkAsUnprocessed;
  public readonly update: RecurringPayment_Update;
  public readonly enable: RecurringPaymentEnable;
  public readonly disable: RecurringPaymentDisable;
  public readonly update_current_amount: RecurringPaymentUpdateCurrentAmount;

  /**
   * Initializes use cases for recurring payment operations
   * @param {IRepoRecurring} repo - Repository for recurrings
   * @param {IRepoItemValue} repo_biv - Item value repository
   * @description Constructs instances of use cases for registering, deleting, and finding recurring payment items
   */
  constructor(repo: IRepoRecurring, repo_biv: IRepoItemValue) {
    this.register = new RecurringPayment_Register(repo);
    this.delete = new RecurringPayment_Delete(repo_biv, repo);
    this.find_by_id = new RecurringPayment_FindById(repo);
    this.list_all = new RecurringPayment_ListAll(repo);
    this.mark_as_processed = new RecurringPaymentItemValue_MarkAsProcessed(repo);
    this.mark_as_unprocessed = new RecurringPaymentItemValue_MarkAsUnprocessed(repo);
    this.update = new RecurringPayment_Update(repo);
    this.enable = new RecurringPaymentEnable(repo);
    this.disable = new RecurringPaymentDisable(repo);
    this.update_current_amount = new RecurringPaymentUpdateCurrentAmount(repo);
  }
}