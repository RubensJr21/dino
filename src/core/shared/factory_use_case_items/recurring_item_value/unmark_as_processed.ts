import { RecurringItemValue } from "@core/entities/recurring_item_value.entity";
import IUseCase from "@core/shared/IUseCase";
import { IRepoRecurringItemValue } from "@src/infrastructure/repositories/drizzle/recurring_item_value.repository";
import { isItemValueNotFoundById, ItemValueUnknownError } from "../../errors/item_value";
import { TypeOfVariants } from "../../types/variants_items";

interface UnmarkRecurringItemValueAsProcessed_Input {
  id: number
}

export default abstract class Create_UseCase_RecurringItemValue_UnmarkAsProcessed implements IUseCase<UnmarkRecurringItemValueAsProcessed_Input, RecurringItemValue>{
  protected abstract variant: TypeOfVariants
  /**
   * Constructor for the UnmarkRecurringItemValueAsProcessed use case
   * @param {IRepoRecurringItemValue} repo_riv Repository for recurring item values used to perform unmark operations
   */
  constructor(
    private repo_riv: IRepoRecurringItemValue
  ){}
  /**
   * Unmarks a recurring item value as processed
   * @param {UnmarkRecurringItemValueAsProcessed_Input} input - The input containing the ID of the recurring item value to unmark
   * @returns {Promise<RecurringItemValue>} The updated recurring item value
   * @throws {ItemValueNotFoundById} If the recurring item value is not found
   * @throws {ItemValueUnknownError} If an unexpected error occurs during the unmark process
   */
  async execute(input: UnmarkRecurringItemValueAsProcessed_Input): Promise<RecurringItemValue> {
    try {
      const recurring_item_value = this.repo_riv.findById(input.id)
      recurring_item_value.markAsProcessed()
  
      const {
        id,
        tag,
        transfer_method_type,
        recurrence_type,
        created_at,
        updated_at,
        ...data
      } = {
        ...recurring_item_value.properties,
        fk_id_tag: recurring_item_value.tag.id,
        fk_id_transfer_method_type: recurring_item_value.transfer_method_type.id,
        fk_id_recurrence_type: recurring_item_value.recurrence_type.id
      }
  
      return this.repo_riv.update(id, data)
    } catch (error) {
      if(isItemValueNotFoundById(error)) {
        throw error
      }
      throw new ItemValueUnknownError()
    }
  }
}