import { IRepoStandard } from "@src/core/shared/interfaces/IRepositoryStandard";
import Payment_Delete from "@src/core/use_cases/payment/standard/delete.use_case";
import Payment_FindById from "@src/core/use_cases/payment/standard/find_by_id.use_case";
import Payment_ListAll from "@src/core/use_cases/payment/standard/list_all.use_case";
import PaymentItemValue_MarkAsProcessed from "@src/core/use_cases/payment/standard/mark_as_processed.use_case";
import PaymentItemValue_MarkAsUnprocessed from "@src/core/use_cases/payment/standard/mark_as_unprocessed.use_case";
import Payment_Register from "@src/core/use_cases/payment/standard/register.use_case";
import Payment_Update from "@src/core/use_cases/payment/standard/update.use_case";
import { IRepoItemValue } from "@src/infrastructure/repositories/item_value.repository";

export default class PaymentUseCases {
  public readonly register: Payment_Register;
  public readonly delete: Payment_Delete;
  public readonly find_by_id: Payment_FindById;
  public readonly list_all: Payment_ListAll;
  public readonly mark_as_processed: PaymentItemValue_MarkAsProcessed;
  public readonly mark_as_unprocessed: PaymentItemValue_MarkAsUnprocessed;
  public readonly update: Payment_Update;

  /**
   * Initializes use cases for payment operations
   * @param {IRepoItemValue} repo - Repository for item values
   * @param {IRepoItemValue} repo_iv - Item value repository
   * @description Constructs instances of use cases for registering, deleting, and finding payment items
   */
  constructor(repo: IRepoStandard, repo_iv: IRepoItemValue) {
    this.register = new Payment_Register(repo);
    this.delete = new Payment_Delete(repo, repo_iv);
    this.find_by_id = new Payment_FindById(repo);
    this.list_all = new Payment_ListAll(repo);
    this.mark_as_processed = new PaymentItemValue_MarkAsProcessed(repo, repo_iv);
    this.mark_as_unprocessed = new PaymentItemValue_MarkAsUnprocessed(repo, repo_iv);
    this.update = new Payment_Update(repo);
  }
}