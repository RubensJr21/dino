import IUseCase from "@core/shared/IUseCase";
import { IRepoItemValue } from "@src/infrastructure/repositories/item_value.repository";
import { isStandardNotFoundById, StandardUnknownError } from "../../errors/standard";
import { IRepoRecurring } from "../../interfaces/IRepositoryRecurring";
import { TypeOfVariants } from "../../types/variants_items";

interface DeleteRecurring_Input {
  id: number
}

export default abstract class UseCase_Recurring_Delete implements IUseCase<DeleteRecurring_Input, boolean>{
  protected abstract variant: TypeOfVariants;
  /**
   * Constructs a new instance of the recurring delete use case.
   * @param {IRepoItemValue} repo_biv Repository for item values
   * @param {IRepoRecurring} repo_riv Repository for recurrings
   */
  constructor(
    private repo_biv: IRepoItemValue,
    private repo_riv: IRepoRecurring
  ){}
  /**
   * Executes the deletion of a recurring by its ID.
   * @param {DeleteRecurring_Input} input - The input containing the ID of the recurring to delete
   * @returns {Promise<boolean>} A promise that resolves to true if the deletion was successful
   * @throws {StandardNotFoundById} If the standard is not found
   * @throws {StandardUnknownError} If an unexpected error occurs during deletion
   */
  async execute(input: DeleteRecurring_Input): Promise<boolean> {
    try {
      // Removendo o item_value a remoção é propagada
      const recurring = this.repo_riv.findById(input.id)
      return this.repo_biv.delete(recurring.itens[0].id)
    } catch(error) {
      if(isStandardNotFoundById(error)){
        throw error
      }
      throw new StandardUnknownError();
    }
  }
}