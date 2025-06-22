import IUseCase from "@core/shared/IUseCase";
import { Recurring } from "@src/core/entities/recurring.entity";
import { isStandardNotFoundById, StandardUnknownError } from "../../errors/standard";
import { IRepoRecurring } from "../../interfaces/IRepositoryRecurring";
import { TypeOfVariants } from "../../types/variants_items";

interface FindRecurringById_Input {
  id: number
}

export default abstract class FindRecurringById implements IUseCase<FindRecurringById_Input, Recurring> {
  protected abstract variant: TypeOfVariants
  /**
   * Constructs an instance of the FindRecurringById use case.
   * @param {IRepoRecurring} repo_riv The repository for recurrings used to fetch data.
   */
  constructor(
    private repo_riv: IRepoRecurring
  ){}
  /**
   * Executes the use case to find a recurring by its ID.
   * @param {FindRecurringById_Input} input - The input containing the ID of the recurring to find.
   * @returns {Promise<Recurring>} A promise that resolves to the found Recurring.
   * @throws {StandardNotFoundById} If no standard is found with the given ID.
   * @throws {StandardUnknownError} If an unexpected error occurs during the lookup.
   */
  async execute(input: FindRecurringById_Input): Promise<Recurring> {
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