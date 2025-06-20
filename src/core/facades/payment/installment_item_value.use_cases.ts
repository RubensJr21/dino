import { IRepoInstallment } from "@src/core/shared/IRepositoryInstallment";
import InstallmentPayment_Delete from "@src/core/use_cases/payment/installment_item_value/delete.use_case";
import InstallmentPayment_FindById from "@src/core/use_cases/payment/installment_item_value/find_by_id.use_case";
import InstallmentPayment_ListAll from "@src/core/use_cases/payment/installment_item_value/list_all.use_case";
import InstallmentPayment_MarkAsProcessed from "@src/core/use_cases/payment/installment_item_value/mark_as_processed.use_case";
import InstallmentPayment_Register from "@src/core/use_cases/payment/installment_item_value/register.use_case";
import InstallmentPayment_UnmarkAsProcessed from "@src/core/use_cases/payment/installment_item_value/unmark_as_processed.use_case";
import InstallmentPayment_Update from "@src/core/use_cases/payment/installment_item_value/update.use_case";
import { IRepositoryItemValue } from "@src/infrastructure/repositories/item_value.repository";

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
   * @param {IRepoInstallment} repo - Repository for installments
   * @param {IRepositoryItemValue} repo_iv - Item value repository
   * @description Constructs instances of use cases for registering, deleting, and finding installment payment items
   */
  constructor(repo: IRepoInstallment, repo_iv: IRepositoryItemValue) {
    this.register = new InstallmentPayment_Register(repo);
    this.delete = new InstallmentPayment_Delete(repo_iv, repo);
    this.find_by_id = new InstallmentPayment_FindById(repo);
    this.list_all = new InstallmentPayment_ListAll(repo);
    this.mark_as_processed = new InstallmentPayment_MarkAsProcessed(repo);
    this.unmark_as_processed = new InstallmentPayment_UnmarkAsProcessed(repo);
    this.update = new InstallmentPayment_Update(repo);
  }
}