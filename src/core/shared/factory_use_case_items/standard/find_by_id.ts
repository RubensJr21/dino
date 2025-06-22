import IUseCase from "@core/shared/IUseCase";
import { Standard } from "@src/core/entities/standard.entity";
import { isStandardNotFoundById, StandardUnknownError } from "../../errors/standard";
import { IRepoStandard } from "../../interfaces/IRepositoryStandard";
import { TypeOfVariants } from "../../types/variants_items";

interface FindStandardById_Input {
  id: number
}

export default abstract class UseCase_Standard_FindById implements IUseCase<FindStandardById_Input, Standard> {
  protected abstract variant: TypeOfVariants;
  /**
   * @param {IRepoStandard} repo_iv The repository for standard operations used in this use case.
   */
  constructor(
    private repo_iv: IRepoStandard,
  ){}
  /**
   * Executes the use case to find an Standard by its ID.
   * @param {FindStandardById_Input} input - The input containing the ID of the Standard to find.
   * @returns {Promise<Standard>} A promise that resolves to the found Standard.
   * @throws {StandardNotFoundById} If no Standard is found with the given ID.
   * @throws {StandardUnknownError} If an unexpected error occurs during the lookup.
   */
  async execute(input: FindStandardById_Input): Promise<Standard> {
    try {
      return this.repo_iv.findById(input.id)
    } catch (error){
      if(isStandardNotFoundById(error)){
        throw error
      }
      throw new StandardUnknownError();
    }
  }
}