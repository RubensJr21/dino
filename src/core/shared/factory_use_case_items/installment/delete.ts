import IUseCase from "@core/shared/IUseCase";
import { IRepoItemValue } from "@src/infrastructure/repositories/item_value.repository";
import { InstallmentUnknownError, isInstallmentNotFoundById } from "../../errors/installment";
import { IRepoInstallment } from "../../interfaces/IRepositoryInstallment";
import { TypeOfVariants } from "../../types/variants_items";

interface DeleteInstallment_Input {
  id: number
}

export default abstract class UseCase_Installment_Delete implements IUseCase<DeleteInstallment_Input, boolean>{
  protected abstract variant: TypeOfVariants
  /**
   * @param {IRepoItemValue} repo_biv Instância de um repositório de Base Item Value
   * @param {IRepoInstallment} repo_iiv Instância de um repositório de Installment Item Value
   */
  constructor(
    private repo_biv: IRepoItemValue,
    private repo_iiv: IRepoInstallment
  ){}
  /**
   * Executes the deletion of an installment by its ID.
   * @param {DeleteInstallment_Input} input - The input containing the ID of the installment to delete
   * @returns {Promise<boolean>} A promise that resolves to true if the deletion is successful
   * @throws {InstallmentNotFoundById} If the installment is not found
   * @throws {InstallmentUnknownError} If an unexpected error occurs during deletion
   */
  async execute(input: DeleteInstallment_Input): Promise<boolean> {
    try {
      const installment = this.repo_iiv.findById(input.id)
      return this.repo_biv.delete(installment.itens[0].id);
    } catch (error) {
      if(isInstallmentNotFoundById(error)){
        throw error
      }
      throw new InstallmentUnknownError()
    }
  }
}