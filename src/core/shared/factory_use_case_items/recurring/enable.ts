import IUseCase from "@core/shared/IUseCase";
import { Recurring } from "@src/core/entities/recurring.entity";
import { IRepoRecurring } from "../../interfaces/IRepositoryRecurring";
import { TypeOfVariants } from "../../types/variants_items";

interface EnableRecurring_Input {
  id: number;
}

export default abstract class UseCase_Recurring_Enable implements IUseCase<EnableRecurring_Input, Recurring>{
  protected abstract variant: TypeOfVariants;
  /**
   * Constructs an instance of the recurring enable use case.
   * @param {IRepoRecurring} repo_rec - The repository for recurring operations
   */
  constructor(
    private repo_rec: IRepoRecurring
  ){}

  /**
   * Executes the enable operation for a recurring.
   * @param {EnableRecurring_Input} input - The input data for updating a recurring
   * @returns {Promise<Recurring>} The enabled recurring or undefined if update fails
   */
  async execute(input: EnableRecurring_Input): Promise<Recurring> {
    const recurring = this.repo_rec.findById(input.id)
    recurring.enable();
    
    const {
      id,
      recurrence_type,
      created_at,
      updated_at,
      itens,
      ...data
    } = {
      ...recurring.properties,
      fk_id_recurrence_type: recurring.recurrence_type.id
    }

    return this.repo_rec.update(input.id, data)
  }
}