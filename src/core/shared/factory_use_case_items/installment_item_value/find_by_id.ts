import IUseCase from "@core/shared/IUseCase";
import { InstallmentItemValue } from "@src/core/entities/installment_item_value.entity";
import { IRepoInstallmentItemValue } from "@src/infrastructure/repositories/drizzle/installment_item_value.repository";
import { InstallmentItemValueUnknownError, isInstallmentItemValueNotFoundById } from "../../errors/installment_item_value";
import { TypeOfVariants } from "../../types/variants_items";

interface FindInstallmentItemValueById_Input {
  id: number
}

export default abstract class UseCase_InstallmentItemValue_FindById implements IUseCase<FindInstallmentItemValueById_Input, InstallmentItemValue> {
  protected abstract variant: TypeOfVariants
  /**
   * @param {IRepoInstallmentItemValue} repo_iiv The repository for retrieving installment item values by ID
   */
  constructor(
    private repo_iiv: IRepoInstallmentItemValue
  ){}
  /**
   * Executes the use case to find an installment item value by its ID
   * @param {FindInstallmentItemValueById_Input} input - The input containing the ID of the installment item value to find
   * @returns {Promise<InstallmentItemValue>} The found installment item value
   * @throws {InstallmentItemValueUnknownError} If an unexpected error occurs during retrieval
   * @throws {InstallmentItemValueNotFoundById} If {@linkcode repo_iiv.findById} throw
   * @throws {Error} If the installment item value is not found by the given ID
   */
  async execute(input: FindInstallmentItemValueById_Input): Promise<InstallmentItemValue> {
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