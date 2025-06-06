import Payment_Delete from "@src/core/use_cases/payment/item_value/delete.use_case";
import Payment_FindById from "@src/core/use_cases/payment/item_value/find_by_id.use_case";
import Payment_ListAll from "@src/core/use_cases/payment/item_value/list_all.use_case";
import Payment_MarkAsProcessed from "@src/core/use_cases/payment/item_value/mark_as_processed.use_case";
import Payment_Register from "@src/core/use_cases/payment/item_value/register.use_case";
import Payment_UnmarkAsProcessed from "@src/core/use_cases/payment/item_value/unmark_as_processed.use_case";
import Payment_Update from "@src/core/use_cases/payment/item_value/update.use_case";
import { IRepositoryBaseItemValue } from "@src/infrastructure/repositories/drizzle/base_item_value.repository";
import { IRepoItemValue } from "@src/infrastructure/repositories/drizzle/item_value.repository";

export default class PaymentUseCases {
  public readonly register: Payment_Register;
  public readonly delete: Payment_Delete;
  public readonly find_by_id: Payment_FindById;
  public readonly list_all: Payment_ListAll;
  public readonly mark_as_processed: Payment_MarkAsProcessed;
  public readonly unmark_as_processed: Payment_UnmarkAsProcessed;
  public readonly update: Payment_Update;

  /**
   * Initializes use cases for payment operations
   * @param {IRepoItemValue} repo - Repository for item values
   * @param {IRepositoryBaseItemValue} repo_biv - Base item value repository
   * @description Constructs instances of use cases for registering, deleting, and finding payment items
   */
  constructor(repo: IRepoItemValue, repo_biv: IRepositoryBaseItemValue) {
    this.register = new Payment_Register(repo);
    this.delete = new Payment_Delete(repo_biv, repo);
    this.find_by_id = new Payment_FindById(repo);
    this.list_all = new Payment_ListAll(repo);
    this.mark_as_processed = new Payment_MarkAsProcessed(repo);
    this.unmark_as_processed = new Payment_UnmarkAsProcessed(repo);
    this.update = new Payment_Update(repo);
  }
}