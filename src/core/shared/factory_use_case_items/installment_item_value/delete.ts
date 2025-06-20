import IUseCase from "@core/shared/IUseCase";
import { IRepositoryItemValue } from "@src/infrastructure/repositories/item_value.repository";
import { InstallmentItemValueUnknownError, isInstallmentItemValueNotFoundById } from "../../errors/installment";
import { IRepoInstallment } from "../../IRepositoryInstallment";
import { TypeOfVariants } from "../../types/variants_items";

interface DeleteInstallmentItemValue_Input {
  id: number
}

export default abstract class UseCase_InstallmentItemValue_Delete implements IUseCase<DeleteInstallmentItemValue_Input, boolean>{
  protected abstract variant: TypeOfVariants
  /**
   * @param {IRepositoryItemValue} repo_biv Instância de um repositório de Base Item Value
   * @param {IRepoInstallment} repo_iiv Instância de um repositório de Installment Item Value
   */
  constructor(
    private repo_biv: IRepositoryItemValue,
    private repo_iiv: IRepoInstallment
  ){}
  /**
   * Executes the deletion of an installment item value by its ID.
   * @param {DeleteInstallmentItemValue_Input} input - The input containing the ID of the installment item value to delete
   * @returns {Promise<boolean>} A promise that resolves to true if the deletion is successful
   * @throws {InstallmentItemValueNotFoundById} If the installment item value is not found
   * @throws {InstallmentItemValueUnknownError} If an unexpected error occurs during deletion
   */
  async execute(input: DeleteInstallmentItemValue_Input): Promise<boolean> {
    try {
      const installment_receipt = this.repo_iiv.findById(input.id)
      // Removendo o base_item_value a remoção é propagada
      // ATTENTION: CORRIGIR ERRO DE LÓGICA
      // @ts-expect-error vou corrigir depois
      return this.repo_biv.delete(installment_receipt.fk);
    } catch (error) {
      if(isInstallmentItemValueNotFoundById(error)){
        throw error
      }
      throw new InstallmentItemValueUnknownError()
    }
  }
}