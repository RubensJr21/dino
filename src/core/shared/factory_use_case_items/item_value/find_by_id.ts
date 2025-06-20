import IUseCase from "@core/shared/IUseCase";
import { ItemValue } from "@src/core/entities/standard.entity";
import { IRepoItemValue } from "@src/infrastructure/repositories/standard.repository";
import { isItemValueNotFoundById, ItemValueUnknownError } from "../../errors/standard";
import { TypeOfVariants } from "../../types/variants_items";

interface FindItemValueById_Input {
  id: number
}

export default abstract class UseCase_ItemValue_FindById implements IUseCase<FindItemValueById_Input, ItemValue> {
  protected abstract variant: TypeOfVariants;
  /**
   * @param {IRepoItemValue} repo_iv The repository for item value operations used in this use case.
   */
  constructor(
    private repo_iv: IRepoItemValue,
  ){}
  /**
   * Executes the use case to find an ItemValue by its ID.
   * @param {FindItemValueById_Input} input - The input containing the ID of the ItemValue to find.
   * @returns {Promise<ItemValue>} A promise that resolves to the found ItemValue.
   * @throws {ItemValueNotFoundById} If no ItemValue is found with the given ID.
   * @throws {ItemValueUnknownError} If an unexpected error occurs during the lookup.
   */
  async execute(input: FindItemValueById_Input): Promise<ItemValue> {
    try {
      return this.repo_iv.findById(input.id)
    } catch (error){
      if(isItemValueNotFoundById(error)){
        throw error
      }
      throw new ItemValueUnknownError();
    }
  }
}