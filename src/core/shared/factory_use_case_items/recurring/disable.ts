import IUseCase from "@core/shared/IUseCase";
import { Recurring } from "@src/core/entities/recurring.entity";
import { IRepoRecurring } from "../../interfaces/IRepositoryRecurring";
import { TypeOfVariants } from "../../types/variants_items";

interface DisableRecurring_Input {
  id: number;
}

export default abstract class UseCase_Recurring_Disable implements IUseCase<DisableRecurring_Input, Recurring>{
  protected abstract variant: TypeOfVariants;
  /**
   * Constructs an instance of the recurring disable use case.
   * @param {IRepoRecurring} repo_rec - The repository for recurring operations
   */
  constructor(
    private repo_rec: IRepoRecurring
  ){}

  /**
   * Executes the disable operation for a recurring.
   * @param {DisableRecurring_Input} input - The input data for updating a recurring
   * @returns {Promise<Recurring>} The disabled recurring or undefined if update fails
   */
  async execute(input: DisableRecurring_Input): Promise<Recurring> {
    const recurring = this.repo_rec.findById(input.id)
    recurring.disable();
    
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