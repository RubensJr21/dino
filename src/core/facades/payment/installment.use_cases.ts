import { IRepoInstallment } from "@src/core/shared/interfaces/IRepositoryInstallment";
import InstallmentPayment_Delete from "@src/core/use_cases/payment/installment/delete.use_case";
import InstallmentPayment_FindById from "@src/core/use_cases/payment/installment/find_by_id.use_case";
import InstallmentPayment_ListAll from "@src/core/use_cases/payment/installment/list_all.use_case";
import InstallmentPaymentItemValue_MarkAsProcessed from "@src/core/use_cases/payment/installment/mark_item_value_as_processed.use_case";
import InstallmentPaymentItemValue_MarkAsUnprocessed from "@src/core/use_cases/payment/installment/mark_item_value_as_unprocessed.use_case";
import InstallmentPayment_Register from "@src/core/use_cases/payment/installment/register.use_case";
import { IRepoItemValue } from "@src/infrastructure/repositories/item_value.repository";

export default class PaymentInstallmentUseCases {
  public readonly register: InstallmentPayment_Register;
  public readonly delete: InstallmentPayment_Delete;
  public readonly find_by_id: InstallmentPayment_FindById;
  public readonly list_all: InstallmentPayment_ListAll;
  public readonly mark_item_value_as_processed: InstallmentPaymentItemValue_MarkAsProcessed;
  public readonly mark_item_value_as_unprocessed: InstallmentPaymentItemValue_MarkAsUnprocessed;
  // Por enquanto não estará habilitado
  // public readonly update: InstallmentPayment_Update;
  // Por enquanto não estará habilitado para atualizar itens de pagamentos parcelados
  // public readonly update_item: InstallmentPayment_UpdateItem;

  /**
   * Initializes use cases for installment payment operations
   * @param {IRepoInstallment} repo - Repository for installments
   * @param {IRepoItemValue} repo_iv - Item value repository
   * @description Constructs instances of use cases for registering, deleting, and finding installment payment items
   */
  constructor(repo: IRepoInstallment, repo_iv: IRepoItemValue) {
    this.register = new InstallmentPayment_Register(repo);
    this.delete = new InstallmentPayment_Delete(repo_iv, repo);
    this.find_by_id = new InstallmentPayment_FindById(repo);
    this.list_all = new InstallmentPayment_ListAll(repo);
    this.mark_item_value_as_processed = new InstallmentPaymentItemValue_MarkAsProcessed(repo, repo_iv);
    this.mark_item_value_as_unprocessed = new InstallmentPaymentItemValue_MarkAsUnprocessed(repo, repo_iv);
    // Por enquanto não estará habilitado
    // this.update = new InstallmentPayment_Update(repo);
    // this.update_item = new InstallmentPayment_UpdateItem(repo, repo_iv);
  }
}