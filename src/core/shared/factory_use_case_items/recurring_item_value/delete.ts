import IUseCase from "@core/shared/IUseCase";
import { IRepositoryBaseItemValue } from "@src/infrastructure/repositories/drizzle/base_item_value.repository";
import { IRepoRecurringItemValue } from "@src/infrastructure/repositories/drizzle/recurring_item_value.repository";
import { isItemValueNotFoundById, ItemValueUnknownError } from "../../errors/item_value";
import { TypeOfVariants } from "../../types/variants_items";

interface DeleteRecurringItemValue_Input {
  id: number
}

export default abstract class UseCase_RecurringItemValue_Delete implements IUseCase<DeleteRecurringItemValue_Input, boolean>{
  protected abstract variant: TypeOfVariants;
  /**
   * Constructs a new instance of the recurring item value delete use case.
   * @param {IRepositoryBaseItemValue} repo_biv Repository for base item values
   * @param {IRepoRecurringItemValue} repo_riv Repository for recurring item values
   */
  constructor(
    private repo_biv: IRepositoryBaseItemValue,
    private repo_riv: IRepoRecurringItemValue
  ){}
  /**
   * Executes the deletion of a recurring item value by its ID.
   * @param {DeleteRecurringItemValue_Input} input - The input containing the ID of the recurring item value to delete
   * @returns {Promise<boolean>} A promise that resolves to true if the deletion was successful
   * @throws {ItemValueNotFoundById} If the item value is not found
   * @throws {ItemValueUnknownError} If an unexpected error occurs during deletion
   */
  async execute(input: DeleteRecurringItemValue_Input): Promise<boolean> {
    try {
      // Removendo o base_item_value a remoção é propagada
      const recurring_receipt = this.repo_riv.findById(input.id)
      return this.repo_biv.delete(recurring_receipt.fk_id_base_item_value)
    } catch(error) {
      if(isItemValueNotFoundById(error)){
        throw error
      }
      throw new ItemValueUnknownError();
    }
  }
}