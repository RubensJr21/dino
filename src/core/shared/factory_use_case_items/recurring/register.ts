import IUseCase from "@core/shared/IUseCase";
import { IRecurring, Recurring } from "@src/core/entities/recurring.entity";
import { IRepoRecurring } from "../../interfaces/IRepoRecurring";
import { Result } from "../../types/Result";
import { TypeOfVariants } from "../../types/variants_items";

type RegisterRecurringInput = StrictOmit<IRecurring, "created_at"|"updated_at">

type Return = Result<Recurring>

export default abstract class UseCase_Recurring_Register implements IUseCase<RegisterRecurringInput, Return> {
  protected abstract variant: TypeOfVariants
  
  constructor(
    private repo_r: IRepoRecurring
  ){}
  
  async execute(input: RegisterRecurringInput): Promise<Return> {
    const {
      start_date,
      current_amount,
      recurrence_type
    } = input
    
    return this.repo_r.create({
      start_date, 
      current_amount,
      fk_id_recurrence_type: recurrence_type.id
    })    
  }
}