import IUseCase from "@core/shared/IUseCase";
import { Recurring } from "@src/core/entities/recurring.entity";
import { IRepoRecurring } from "../../interfaces/IRepositoryRecurring";
import { TypeOfVariants } from "../../types/variants_items";

interface UpdateRecurring_Input {
  id: number;
  data: StrictOmit<Recurring, "id">
}

export default abstract class UseCase_Recurring_Update implements IUseCase<UpdateRecurring_Input, Recurring>{
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
   * @param {UpdateRecurring_Input} input - The input data for updating a recurring
   * @returns {Promise<Recurring>} The updated recurring or undefined if update fails
   */
  async execute(input: UpdateRecurring_Input): Promise<Recurring> {
    const {
      id,
      recurrence_type,
      created_at,
      updated_at,
      itens,
      ...data
    } = input.data.properties

    return this.repo_rec.update(id, data)
  }
}