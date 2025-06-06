import IUseCase from "@core/shared/IUseCase";
import { IRepositoryBaseItemValue } from "@src/infrastructure/repositories/drizzle/base_item_value.repository";
import { IRepoItemValue } from "@src/infrastructure/repositories/drizzle/item_value.repository";
import { isItemValueNotFoundById, ItemValueUnknownError } from "../../errors/item_value";
import { TypeOfVariants } from "../../types/variants_items";

interface DeleteItemValue_Input {
  id: number
}

export default abstract class UseCase_ItemValue_Delete implements IUseCase<DeleteItemValue_Input, boolean>{
  protected abstract variant: TypeOfVariants
  /**
   * Constructs an instance of the item value deletion use case.
   * @param {IRepositoryBaseItemValue} repo_biv Repository for base item values
   * @param {IRepoItemValue} repo_iv Repository for item values
   */
  constructor(
    private repo_biv: IRepositoryBaseItemValue,
    private repo_iv: IRepoItemValue
  ){}
  /**
   * Executes the deletion of an item value by its ID.
   * @param {DeleteItemValue_Input} input - The input containing the ID of the item value to delete
   * @returns {Promise<boolean>} A promise that resolves to true if the deletion was successful
   * @throws {Error} If the item value is not found
   */
  async execute(input: DeleteItemValue_Input): Promise<boolean> {
    try {
      // Removendo o base_item_value a remoção é propagada
      const receipt = this.repo_iv.findById(input.id)
      return this.repo_biv.delete(receipt.fk_id_base_item_value)
    } catch(error) {
      if(isItemValueNotFoundById(error)){
        throw error
      }
      throw new ItemValueUnknownError();
    }
  }
}