import IUseCase from "@core/shared/IUseCase";
import { Installment } from "@src/core/entities/installment.entity";
import { InstallmentUnknownError, isInstallmentNotFoundById } from "../../errors/installment";
import { IRepoInstallment } from "../../interfaces/IRepositoryInstallment";
import { TypeOfVariants } from "../../types/variants_items";

interface FindInstallmentById_Input {
  id: number
}

export default abstract class UseCase_Installment_FindById implements IUseCase<FindInstallmentById_Input, Installment> {
  protected abstract variant: TypeOfVariants
  /**
   * @param {IRepoInstallment} repo_iiv The repository for retrieving installments by ID
   */
  constructor(
    private repo_iiv: IRepoInstallment
  ){}
  /**
   * Executes the use case to find an installment by its ID
   * @param {FindInstallmentById_Input} input - The input containing the ID of the installment to find
   * @returns {Promise<Installment>} The found installment
   * @throws {InstallmentUnknownError} If an unexpected error occurs during retrieval
   * @throws {InstallmentNotFoundById} If {@linkcode repo_iiv.findById} throw
   * @throws {Error} If the installment is not found by the given ID
   */
  async execute(input: FindInstallmentById_Input): Promise<Installment> {
    try {
      const iiv = this.repo_iiv.findById(input.id)
      return iiv
    } catch (error) {
      if(isInstallmentNotFoundById(error)){
        throw error
      }
      throw new InstallmentUnknownError()
      // if(!iiv){ throw new Error(`Installment ${this.variant} not found!`); }
    }
  }
}