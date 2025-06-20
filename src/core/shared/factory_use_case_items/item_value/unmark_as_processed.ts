import IUseCase from "@core/shared/IUseCase";
import { ItemValue } from "@src/core/entities/standard.entity";
import { IRepoItemValue } from "@src/infrastructure/repositories/standard.repository";
import { isItemValueNotFoundById, ItemValueUnknownError } from "../../errors/standard";
import { TypeOfVariants } from "../../types/variants_items";

interface UnmarkItemValueAsProcessed_Input {
  id: number
}

export default abstract class UseCase_ItemValue_UnmarkAsProcessed implements IUseCase<UnmarkItemValueAsProcessed_Input, ItemValue>{
  protected abstract variant: TypeOfVariants;
  /**
   * Constructs an instance of the use case with the required item value repository
   * @param {IRepoItemValue} repo_iv - The repository for item value operations
   */
  constructor(
    private repo_iv: IRepoItemValue
  ){}
  /**
   * Unmarks an item value as processed by updating its properties
   * @param {UnmarkItemValueAsProcessed_Input} input - The input containing the item value ID
   * @returns {Promise<ItemValue>} The updated item value
   * @throws {ItemValueNotFoundError} If the item value is not found
   * @throws {ItemValueUnknownError} If an unexpected error occurs during processing
   */
  async execute(input: UnmarkItemValueAsProcessed_Input): Promise<ItemValue> {
    try {
      const item_value = this.repo_iv.findById(input.id)
      item_value.markAsProcessed()
  
      const {
        id,
        tag,
        transfer_method_type,
        created_at,
        updated_at,
        ...data
      } = {
        ...item_value.properties,
        fk_id_tag: item_value.tag.id,
        fk_id_transfer_method_type: item_value.transfer_method_type.id
      }
  
      return this.repo_iv.update(id, data)
    } catch (error) {
      if(isItemValueNotFoundById(error)) {
        throw error
      }
      throw new ItemValueUnknownError()
    }
  }
}