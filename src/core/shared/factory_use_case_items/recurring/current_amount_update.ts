import IUseCase from "@core/shared/IUseCase";
import { Recurring } from "@src/core/entities/recurring.entity";
import { IRepoRecurring } from "../../interfaces/IRepositoryRecurring";
import { TypeOfVariants } from "../../types/variants_items";

interface UpdateCurrentAmountRecurring_Input {
  id: Recurring["id"];
  current_amount: Recurring["current_amount"]
}

export default abstract class UseCase_Recurring_UpdateCurrentAmount implements IUseCase<UpdateCurrentAmountRecurring_Input, Recurring>{
  protected abstract variant: TypeOfVariants;
  /**
   * Constructs an instance of the recurring update use case.
   * @param {IRepoRecurring} repo_rec - The repository for recurring operations
   */
  constructor(
    private repo_rec: IRepoRecurring
  ){}

  /**
   * Executes the update operation for a recurring.
   * @param {UpdateCurrentAmountRecurring_Input} input - The input data for updating a recurring
   * @returns {Promise<Recurring>} The updated recurring or undefined if update fails
   */
  async execute(input: UpdateCurrentAmountRecurring_Input): Promise<Recurring> {
    const recurring = this.repo_rec.findById(input.id)
    const {
      id,
      recurrence_type,
      created_at,
      updated_at,
      itens,
      ...data
    } = {
      ...recurring.properties,
      ...input,
      fk_id_recurrence_type: recurring.recurrence_type.id,
    }

    return this.repo_rec.update(input.id, data)
  }
}