import { RecurringItemValue } from "@core/entities/recurring_item_value.entity";
import IUseCase from "@core/shared/IUseCase";
import { IRepoRecurringItemValue } from "@src/infrastructure/repositories/drizzle/recurring_item_value.repository";
import { isItemValueNotFoundById, ItemValueUnknownError } from "../../errors/item_value";
import { TypeOfVariants } from "../../types/variants_items";

interface MarkRecurringItemValueAsProcessed_Input {
  id: number
}

export default abstract class UseCase_RecurringItemValue_MarkAsProcessed implements IUseCase<MarkRecurringItemValueAsProcessed_Input, RecurringItemValue>{
  protected abstract variant: TypeOfVariants
  /**
   * Constructs an instance of the use case with a repository for recurring item values.
   * @param {IRepoRecurringItemValue} repo_riv The repository for managing recurring item values.
   */
  constructor(
    private repo_riv: IRepoRecurringItemValue
  ){}
  /**
   * Marks a recurring item value as processed by updating its status.
   * @param {MarkRecurringItemValueAsProcessed_Input} input - The input containing the ID of the recurring item value to mark as processed.
   * @returns {Promise<RecurringItemValue>} The updated recurring item value after marking it as processed.
   * @throws {ItemValueNotFoundById} If the recurring item value with the given ID is not found.
   * @throws {ItemValueUnknownError} If an unexpected error occurs during processing.
   */
  async execute(input: MarkRecurringItemValueAsProcessed_Input): Promise<RecurringItemValue> {
    
    try {
      const recurring_item_value_searched = this.repo_riv.findById(input.id)
      recurring_item_value_searched.markAsProcessed()
      const properties = recurring_item_value_searched.properties
      const {
        id,
        tag,
        transfer_method_type,
        recurrence_type,
        created_at,
        updated_at,
        ...props
      } = {
        ...properties,
        fk_id_tag: properties.tag.id,
        fk_id_transfer_method_type: properties.transfer_method_type.id,
        fk_id_recurrence_type: properties.recurrence_type.id
      }
      
      return this.repo_riv.update(id, props)  
    } catch (error) {
      if(isItemValueNotFoundById(error)){
        throw error
      }
      throw new ItemValueUnknownError()
    }
  }
}