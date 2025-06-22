import { IRepoInstallment } from "@src/core/shared/interfaces/IRepositoryInstallment";
import InstallmentReceipt_Delete from "@src/core/use_cases/receipt/installment/delete.use_case";
import InstallmentReceipt_FindById from "@src/core/use_cases/receipt/installment/find_by_id.use_case";
import InstallmentReceipt_ListAll from "@src/core/use_cases/receipt/installment/list_all.use_case";
import InstallmentReceiptItemValue_MarkAsProcessed from "@src/core/use_cases/receipt/installment/mark_item_value_as_processed.use_case";
import InstallmentReceiptItemValue_MarkAsUnprocessed from "@src/core/use_cases/receipt/installment/mark_item_value_as_unprocessed.use_case";
import InstallmentReceipt_Register from "@src/core/use_cases/receipt/installment/register.use_case";
import { IRepoItemValue } from "@src/infrastructure/repositories/item_value.repository";

export default class ReceiptInstallmentUseCases {
  public readonly register: InstallmentReceipt_Register;
  public readonly delete: InstallmentReceipt_Delete;
  public readonly find_by_id: InstallmentReceipt_FindById;
  public readonly list_all: InstallmentReceipt_ListAll;
  public readonly mark_as_processed: InstallmentReceiptItemValue_MarkAsProcessed;
  public readonly mark_as_unprocessed: InstallmentReceiptItemValue_MarkAsUnprocessed;
  // Por enquanto não estará habilitado
  // public readonly update: InstallmentReceipt_Update;
  // Por enquanto não estará habilitado para atualizar itens de recebimentos parcelados
  // public readonly update_item: InstallmentReceipt_UpdateItem;

  /**
   * Initializes use cases for installment receipt operations
   * @param {IRepoInstallment} repo - Repository for installment item values
   * @param {IRepoItemValue} repo_iv - Item value repository
   * @description Constructs instances of use cases for registering, deleting, and finding installment receipt items
   */
  constructor(repo: IRepoInstallment, repo_iv: IRepoItemValue) {
    this.register = new InstallmentReceipt_Register(repo);
    this.delete = new InstallmentReceipt_Delete(repo_iv, repo);
    this.find_by_id = new InstallmentReceipt_FindById(repo);
    this.list_all = new InstallmentReceipt_ListAll(repo);
    this.mark_as_processed = new InstallmentReceiptItemValue_MarkAsProcessed(repo, repo_iv);
    this.mark_as_unprocessed = new InstallmentReceiptItemValue_MarkAsUnprocessed(repo, repo_iv);
    // Por enquanto não estará habilitado
    // this.update = new InstallmentReceipt_Update(repo);
    // this.update_item = new InstallmentReceipt_UpdateItem(repo, repo_iv);
  }
}