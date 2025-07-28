import IUseCase from "@core/shared/IUseCase";
import { IRecurring, Recurring } from "@src/core/entities/recurring.entity";
import { IRepoRecurring } from "../../interfaces/IRepoRecurring";
import { TypeOfVariants } from "../../types/variants_items";

interface Input {
  id: IRecurring["id"]
}

type UseCaseInterface = IUseCase<Input, Recurring>

export default abstract class DisableRecurring implements UseCaseInterface {
  protected abstract variant: TypeOfVariants;
  
  constructor(
    private repo_r: IRepoRecurring
  ){}
  
  async execute(input: Input): ReturnType<UseCaseInterface["execute"]> {
    const result_search = this.repo_r.findById(input.id)

    if (!result_search.success) {
      const scope = `DisableRecurring(${this.repo_r.findById.name}) > ${result_search.error.scope}`
      return {
        success: false,
        error: {
          ...result_search.error,
          scope
        }
      }
    }

    const recurring = result_search.data

    recurring.disable();
    
    const {
      id,
      tag,
      transfer_method,
      recurrence_type,
      created_at,
      updated_at,
      ...data
    } = {
      ...recurring.properties,
      fk_id_tag: recurring.tag.id,
      fk_id_transfer_method: recurring.transfer_method.id,
      fk_id_recurrence_type: recurring.recurrence_type.id,
    }

    const result_updated = this.repo_r.update(input.id, data)

    if(!result_updated.success) {
      const scope = `DisableRecurring(${this.repo_r.update.name}) > ${result_updated.error.scope}`
      return {
        success: false,
        error: {
          ...result_updated.error,
          scope
        }
      }
    }

    return {
      success: true,
      data: result_updated.data
    }
  }
}