import InstallmentPayment_Delete from "@src/core/use_cases/payment/installment_item_value/delete.use_case";
import InstallmentPayment_FindById from "@src/core/use_cases/payment/installment_item_value/find_by_id.use_case";
import InstallmentPayment_ListAll from "@src/core/use_cases/payment/installment_item_value/list_all.use_case";
import InstallmentPayment_MarkAsProcessed from "@src/core/use_cases/payment/installment_item_value/mark_as_processed.use_case";
import InstallmentPayment_Register from "@src/core/use_cases/payment/installment_item_value/register.use_case";
import InstallmentPayment_UnmarkAsProcessed from "@src/core/use_cases/payment/installment_item_value/unmark_as_processed.use_case";
import InstallmentPayment_Update from "@src/core/use_cases/payment/installment_item_value/update.use_case";
import { IRepositoryBaseItemValue } from "@src/infrastructure/repositories/drizzle/base_item_value.repository";
import { IRepoInstallmentItemValue } from "@src/infrastructure/repositories/drizzle/installment_item_value.repository";

export default class PaymentInstallmentUseCases {
  public readonly register: InstallmentPayment_Register;
  public readonly delete: InstallmentPayment_Delete;
  public readonly find_by_id: InstallmentPayment_FindById;
  public readonly list_all: InstallmentPayment_ListAll;
  public readonly mark_as_processed: InstallmentPayment_MarkAsProcessed;
  public readonly unmark_as_processed: InstallmentPayment_UnmarkAsProcessed;
  public readonly update: InstallmentPayment_Update;

  /**
   * Initializes use cases for installment payment operations
   * @param {IRepoInstallmentItemValue} repo - Repository for installment item values
   * @param {IRepositoryBaseItemValue} repo_biv - Base item value repository
   * @description Constructs instances of use cases for registering, deleting, and finding installment payment items
   */
  constructor(repo: IRepoInstallmentItemValue, repo_biv: IRepositoryBaseItemValue) {
    this.register = new InstallmentPayment_Register(repo);
    this.delete = new InstallmentPayment_Delete(repo_biv, repo);
    this.find_by_id = new InstallmentPayment_FindById(repo);
    this.list_all = new InstallmentPayment_ListAll(repo);
    this.mark_as_processed = new InstallmentPayment_MarkAsProcessed(repo);
    this.unmark_as_processed = new InstallmentPayment_UnmarkAsProcessed(repo);
    this.update = new InstallmentPayment_Update(repo);
  }
}