import IUseCase from "@core/shared/IUseCase";
import { IRepoItemValue } from "@src/infrastructure/repositories/item_value.repository";
import { isStandardNotFoundById, StandardUnknownError } from "../../errors/standard";
import { IRepoStandard } from "../../interfaces/IRepositoryStandard";
import { TypeOfVariants } from "../../types/variants_items";

interface DeleteStandard_Input {
  id: number
}

export default abstract class UseCase_Standard_Delete implements IUseCase<DeleteStandard_Input, boolean>{
  protected abstract variant: TypeOfVariants
  /**
   * Constructs an instance of the standard deletion use case.
   * @param {IRepoStandard} repo_s Repository for standards
   * @param {IRepoItemValue} repo_iv Repository for item values
   */
  constructor(
    private repo_s: IRepoStandard,
    private repo_iv: IRepoItemValue
  ){}
  /**
   * Executes the deletion of an item value by its ID.
   * @param {DeleteStandard_Input} input - The input containing the ID of the item value to delete
   * @returns {Promise<boolean>} A promise that resolves to true if the deletion was successful
   * @throws {Error} If the item value is not found
   */
  async execute(input: DeleteStandard_Input): Promise<boolean> {
    try {
      // Removendo o item_value a remoção é propagada
      const standard = this.repo_s.findById(input.id)
      return this.repo_iv.delete(standard.item_value.id)
    } catch(error) {
      if(isStandardNotFoundById(error)){
        throw error
      }
      throw new StandardUnknownError();
    }
  }
}