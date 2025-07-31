import IUseCase from "@core/shared/IUseCase";
import { IRecurring, Recurring } from "@src/core/entities/recurring.entity";
import { IRepoRecurring } from "../../interfaces/IRepoRecurring";
import { TypeOfVariants } from "../../types/variants_items";

interface Input {
  id: IRecurring["id"];
  current_amount: IRecurring["current_amount"]
}

type UseCaseInterface = IUseCase<Input, Recurring>

export default abstract class UpdateCurrentRecurringAmount implements UseCaseInterface {
  protected abstract variant: TypeOfVariants;
  
  constructor( private repo_r: IRepoRecurring ){}
  
  async execute(input: Input): ReturnType<UseCaseInterface["execute"]> {
    const result_search = this.repo_r.find_by_id(input.id);

    if(!result_search.success){
      const scope = `UpdateCurrentRecurringAmount(${this.repo_r.find_by_id.name}) > ${result_search.error.scope}`
      return {
        success: false,
        error: {
          ...result_search.error,
          scope
        }
      }
    }

    const data = result_search.data.properties

    const result_update = this.repo_r.update(input.id, {
      is_disabled: data.is_disabled,
      current_amount: input.current_amount,
      start_date: data.start_date,
      end_date: data.end_date,
      fk_id_tag: data.tag.id,
      fk_id_transfer_method: data.transfer_method.id
    })

    if(!result_update.success){
      const scope = `UpdateCurrentRecurringAmount(${this.repo_r.find_by_id.name}) > ${result_update.error.scope}`
      return {
        success: false,
        error: {
          ...result_update.error,
          scope
        }
      }
    }

    return {
      success: true,
      data: result_update.data
    }
  }
}