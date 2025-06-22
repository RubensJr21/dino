import IUseCase from "@core/shared/IUseCase";
import { IRecurring, Recurring } from "@src/core/entities/recurring.entity";
import { IRepoRecurring } from "../../interfaces/IRepositoryRecurring";
import { TypeOfVariants } from "../../types/variants_items";

type RegisterRecurringInput = StrictOmit<IRecurring, "created_at"|"updated_at">

export default abstract class UseCase_Recurring_Register implements IUseCase<RegisterRecurringInput, Recurring> {
  protected abstract variant: TypeOfVariants
  /**
   * Constructs a new instance of the recurring registration use case.
   * @param {IRepoRecurring} repo_r - The repository for recurrings used in the registration process.
   */
  constructor(
    private repo_r: IRepoRecurring
  ){}
  /**
   * Executes the registration of a recurring.
   * @param {RegisterRecurringInput} input - The input data for creating a recurring.
   * @returns {Promise<Recurring>} A promise that resolves to the created recurring.
   */
  async execute(input: RegisterRecurringInput): Promise<Recurring> {
    const {
      start_date,
      current_amount,
      recurrence_type,
      itens
    } = input
    
    return this.repo_r.create({
      start_date, 
      current_amount,
      fk_id_recurrence_type: recurrence_type.id,
      itens
    })    
  }
}