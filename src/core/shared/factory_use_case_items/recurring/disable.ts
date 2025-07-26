import IUseCase from "@core/shared/IUseCase";
import { Recurring } from "@src/core/entities/recurring.entity";
import { IRepoRecurring } from "../../interfaces/IRepoRecurring";
import { Result } from "../../types/Result";
import { TypeOfVariants } from "../../types/variants_items";

interface DisableRecurring_Input {
  id: number;
}

type Return = Result<Recurring>

export default abstract class UseCase_Recurring_Disable implements IUseCase<DisableRecurring_Input, Return>{
  protected abstract variant: TypeOfVariants;
  
  constructor(
    private repo_rec: IRepoRecurring
  ){}
  
  async execute(input: DisableRecurring_Input): Promise<Return> {
    const result = this.repo_rec.findById(input.id)

    if (!result.success) {
      return {
        success: false,
        error: result.error.message
      }
    }

    const recurring = result.data

    recurring.disable();
    
    const {
      id,
      recurrence_type,
      created_at,
      updated_at,
      ...data
    } = {
      ...recurring.properties,
      fk_id_recurrence_type: recurring.recurrence_type.id
    }

    return this.repo_rec.update(input.id, data)
  }
}