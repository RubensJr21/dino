import { ItemValue } from "@core/entities/item_value.entity";
import IUseCase from "@core/shared/IUseCase";
import { IRepoRecurringItemValue } from "@src/infrastructure/repositories/drizzle/recurring_item_value.repository";
import { isItemValueNotFoundById, ItemValueUnknownError } from "../../errors/item_value";
import { TypeOfVariants } from "../../types/variants_items";

interface FindRecurringReceiptById_Input {
  id: number
}

export default abstract class FindRecurringReceiptById implements IUseCase<FindRecurringReceiptById_Input, ItemValue> {
  protected abstract variant: TypeOfVariants
  /**
   * Constructs an instance of the FindRecurringReceiptById use case.
   * @param {IRepoRecurringItemValue} repo_riv The repository for recurring item values used to fetch data.
   */
  constructor(
    private repo_riv: IRepoRecurringItemValue
  ){}
  /**
   * Executes the use case to find a recurring item value by its ID.
   * @param {FindRecurringReceiptById_Input} input - The input containing the ID of the recurring item value to find.
   * @returns {Promise<ItemValue>} A promise that resolves to the found ItemValue.
   * @throws {ItemValueNotFoundById} If no item value is found with the given ID.
   * @throws {ItemValueUnknownError} If an unexpected error occurs during the lookup.
   */
  async execute(input: FindRecurringReceiptById_Input): Promise<ItemValue> {
    try {
      return this.repo_riv.findById(input.id)
    } catch (error){
      if(isItemValueNotFoundById(error)){
        throw error
      }
      throw new ItemValueUnknownError();
    }
  }
}