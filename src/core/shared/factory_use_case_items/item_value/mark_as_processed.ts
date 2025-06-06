import { ItemValue } from "@core/entities/item_value.entity";
import IUseCase from "@core/shared/IUseCase";
import { IRepoItemValue } from "@src/infrastructure/repositories/drizzle/item_value.repository";
import { isItemValueNotFoundById, ItemValueUnknownError } from "../../errors/item_value";
import { TypeOfVariants } from "../../types/variants_items";

interface MarkItemValueAsProcessed_Input {
  id: number
}

export default abstract class UseCase_ItemValue_MarkAsProcessed implements IUseCase<MarkItemValueAsProcessed_Input, ItemValue>{
  protected abstract variant: TypeOfVariants;
  /**
   * Constructs an instance of the use case with the required item value repository
   * @param {IRepoItemValue} repo_iv - The repository for item value operations
   */
  constructor(
    private repo_iv: IRepoItemValue
  ){}
  /**
   * Marks an item value as processed by updating its status in the repository
   * @param {MarkItemValueAsProcessed_Input} input - The input containing the item value ID to be processed
   * @returns {Promise<ItemValue>} The updated item value after marking as processed
   * @throws {ItemValueNotFoundById} If the item value with the given ID is not found
   * @throws {ItemValueUnknownError} If an unexpected error occurs during processing
   */
  async execute(input: MarkItemValueAsProcessed_Input): Promise<ItemValue> {
    try {
      const item_value_searched = this.repo_iv.findById(input.id)
      item_value_searched.markAsProcessed()
      const properties = item_value_searched.properties
      const {
        id,
        tag,
        transfer_method_type,
        created_at,
        updated_at,
        ...props
      } = {
        ...properties,
        fk_id_tag: properties.tag.id,
        fk_id_transfer_method_type: properties.transfer_method_type.id
      }
      return this.repo_iv.update(id, props)
    } catch (error) {
      if(isItemValueNotFoundById(error)){
        throw error
      }
      throw new ItemValueUnknownError()
    }
  }
}