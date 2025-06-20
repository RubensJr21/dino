import IUseCase from "@core/shared/IUseCase";
import { Standard } from "@src/core/entities/standard.entity";
import { isStandardNotFoundById, StandardUnknownError } from "../../errors/standard";
import { IRepoRecurring } from "../../IRepositoryRecurring";
import { TypeOfVariants } from "../../types/variants_items";

interface FindRecurringReceiptById_Input {
  id: number
}

export default abstract class FindRecurringReceiptById implements IUseCase<FindRecurringReceiptById_Input, Standard> {
  protected abstract variant: TypeOfVariants
  /**
   * Constructs an instance of the FindRecurringReceiptById use case.
   * @param {IRepoRecurring} repo_riv The repository for recurring item values used to fetch data.
   */
  constructor(
    private repo_riv: IRepoRecurring
  ){}
  /**
   * Executes the use case to find a recurring item value by its ID.
   * @param {FindRecurringReceiptById_Input} input - The input containing the ID of the recurring item value to find.
   * @returns {Promise<Standard>} A promise that resolves to the found Standard.
   * @throws {StandardNotFoundById} If no item value is found with the given ID.
   * @throws {StandardUnknownError} If an unexpected error occurs during the lookup.
   */
  async execute(input: FindRecurringReceiptById_Input): Promise<Standard> {
    try {
      return this.repo_riv.findById(input.id)
    } catch (error){
      if(isStandardNotFoundById(error)){
        throw error
      }
      throw new StandardUnknownError();
    }
  }
}