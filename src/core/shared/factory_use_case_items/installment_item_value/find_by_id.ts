import IUseCase from "@core/shared/IUseCase";
import { Installment } from "@src/core/entities/installment.entity";
import { IRepoInstallmentItemValue } from "@src/infrastructure/repositories/installment.repository";
import { InstallmentItemValueUnknownError, isInstallmentItemValueNotFoundById } from "../../errors/installment";
import { TypeOfVariants } from "../../types/variants_items";

interface FindInstallmentItemValueById_Input {
  id: number
}

export default abstract class UseCase_InstallmentItemValue_FindById implements IUseCase<FindInstallmentItemValueById_Input, Installment> {
  protected abstract variant: TypeOfVariants
  /**
   * @param {IRepoInstallmentItemValue} repo_iiv The repository for retrieving installments by ID
   */
  constructor(
    private repo_iiv: IRepoInstallmentItemValue
  ){}
  /**
   * Executes the use case to find an installment by its ID
   * @param {FindInstallmentItemValueById_Input} input - The input containing the ID of the installment to find
   * @returns {Promise<Installment>} The found installment
   * @throws {InstallmentItemValueUnknownError} If an unexpected error occurs during retrieval
   * @throws {InstallmentItemValueNotFoundById} If {@linkcode repo_iiv.findById} throw
   * @throws {Error} If the installment is not found by the given ID
   */
  async execute(input: FindInstallmentItemValueById_Input): Promise<Installment> {
    try {
      const iiv = this.repo_iiv.findById(input.id)
      return iiv
    } catch (error) {
      if(isInstallmentItemValueNotFoundById(error)){
        throw error
      }
      throw new InstallmentItemValueUnknownError()
      // if(!iiv){ throw new Error(`Installment ${this.variant} not found!`); }
    }
  }
}