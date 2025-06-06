import InstallmentReceipt_Delete from "@src/core/use_cases/receipt/installment_item_value/delete.use_case";
import InstallmentReceipt_FindById from "@src/core/use_cases/receipt/installment_item_value/find_by_id.use_case";
import InstallmentReceipt_ListAll from "@src/core/use_cases/receipt/installment_item_value/list_all.use_case";
import InstallmentReceipt_MarkAsProcessed from "@src/core/use_cases/receipt/installment_item_value/mark_as_processed.use_case";
import InstallmentReceipt_Register from "@src/core/use_cases/receipt/installment_item_value/register.use_case";
import InstallmentReceipt_UnmarkAsProcessed from "@src/core/use_cases/receipt/installment_item_value/unmark_as_processed.use_case";
import InstallmentReceipt_Update from "@src/core/use_cases/receipt/installment_item_value/update.use_case";
import { IRepositoryBaseItemValue } from "@src/infrastructure/repositories/drizzle/base_item_value.repository";
import { IRepoInstallmentItemValue } from "@src/infrastructure/repositories/drizzle/installment_item_value.repository";

export default class ReceiptInstallmentUseCases {
  public readonly register: InstallmentReceipt_Register;
  public readonly delete: InstallmentReceipt_Delete;
  public readonly find_by_id: InstallmentReceipt_FindById;
  public readonly list_all: InstallmentReceipt_ListAll;
  public readonly mark_as_processed: InstallmentReceipt_MarkAsProcessed;
  public readonly unmark_as_processed: InstallmentReceipt_UnmarkAsProcessed;
  public readonly update: InstallmentReceipt_Update;

  /**
   * Initializes use cases for installment receipt operations
   * @param {IRepoInstallmentItemValue} repo - Repository for installment item values
   * @param {IRepositoryBaseItemValue} repo_biv - Base item value repository
   * @description Constructs instances of use cases for registering, deleting, and finding installment receipt items
   */
  constructor(repo: IRepoInstallmentItemValue, repo_biv: IRepositoryBaseItemValue) {
    this.register = new InstallmentReceipt_Register(repo);
    this.delete = new InstallmentReceipt_Delete(repo_biv, repo);
    this.find_by_id = new InstallmentReceipt_FindById(repo);
    this.list_all = new InstallmentReceipt_ListAll(repo);
    this.mark_as_processed = new InstallmentReceipt_MarkAsProcessed(repo);
    this.unmark_as_processed = new InstallmentReceipt_UnmarkAsProcessed(repo);
    this.update = new InstallmentReceipt_Update(repo);
  }
}