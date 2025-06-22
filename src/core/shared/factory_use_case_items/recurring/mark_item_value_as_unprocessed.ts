import IUseCase from "@core/shared/IUseCase";
import { ItemValue } from "@src/core/entities/item_value.entity";
import { Recurring } from "@src/core/entities/recurring.entity";
import { ItemValueNotFoundById } from "../../errors/item_value";
import { isStandardNotFoundById, StandardUnknownError } from "../../errors/standard";
import { IRepoRecurring } from "../../interfaces/IRepositoryRecurring";
import { TypeOfVariants } from "../../types/variants_items";

interface MarkRecurringItemValueAsUnprocessed_Input {
  id: Recurring["id"];
  item_value_id: ItemValue["id"];
}

export default abstract class Create_UseCase_RecurringItemValue_MarkAsUnprocessed implements IUseCase<MarkRecurringItemValueAsUnprocessed_Input, Recurring>{
  protected abstract variant: TypeOfVariants
  /**
   * Constructor for the MarkRecurringItemValueAsUnprocessed use case
   * @param {IRepoRecurring} repo_rec Repository for recurrings used to perform unmark operations
   */
  constructor(
    private repo_rec: IRepoRecurring
  ){}
  /**
   * Marks a recurring item value as unprocessed
   * @param {MarkRecurringItemValueAsUnprocessed_Input} input - The input containing the ID of the recurring to unmark
   * @returns {Promise<Recurring>} The updated recurring
   * @throws {StandardNotFoundById} If the recurring is not found
   * @throws {StandardUnknownError} If an unexpected error occurs during the unmark process
   */
  async execute(input: MarkRecurringItemValueAsUnprocessed_Input): Promise<Recurring> {
    try {
      const recurring_item_value = this.repo_rec.findById(input.id)
      const item_value = recurring_item_value.itens.find((iv) => iv.id === input.item_value_id)
      if(!item_value){
        throw new ItemValueNotFoundById(input.item_value_id)
      }
      item_value.markAsProcessed()
  
      const {
        id,
        recurrence_type,
        created_at,
        updated_at,
        ...data
      } = {
        ...recurring_item_value.properties,
        fk_id_recurrence_type: recurring_item_value.recurrence_type.id
      }
  
      return this.repo_rec.update(id, data)
    } catch (error) {
      if(isStandardNotFoundById(error)) {
        throw error
      }
      throw new StandardUnknownError()
    }
  }
}