import IUseCase from "@core/shared/IUseCase";
import { Recurring } from "@src/core/entities/recurring.entity";
import { isStandardNotFoundById, StandardUnknownError } from "../../errors/standard";
import { IRepoRecurring } from "../../IRepositoryRecurring";
import { TypeOfVariants } from "../../types/variants_items";

interface MarkRecurringAsProcessed_Input {
  id: number
}

export default abstract class UseCase_Recurring_MarkAsProcessed implements IUseCase<MarkRecurringAsProcessed_Input, Recurring>{
  protected abstract variant: TypeOfVariants
  /**
   * Constructs an instance of the use case with a repository for recurring item values.
   * @param {IRepoRecurring} repo_riv The repository for managing recurring item values.
   */
  constructor(
    private repo_riv: IRepoRecurring
  ){}
  /**
   * Marks a recurring item value as processed by updating its status.
   * @param {MarkRecurringAsProcessed_Input} input - The input containing the ID of the recurring item value to mark as processed.
   * @returns {Promise<Recurring>} The updated recurring item value after marking it as processed.
   * @throws {ItemValueNotFoundById} If the recurring item value with the given ID is not found.
   * @throws {StandardUnknownError} If an unexpected error occurs during processing.
   */
  async execute(input: MarkRecurringAsProcessed_Input): Promise<Recurring> {
    
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
      if(isStandardNotFoundById(error)){
        throw error
      }
      throw new StandardUnknownError()
    }
  }
}