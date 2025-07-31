import IUseCase from "@core/shared/IUseCase";
import { IRecurring, Recurring } from "@src/core/entities/recurring.entity";
import { IRepoRecurring } from "../../interfaces/IRepoRecurring";
import { TypeOfVariants } from "../../types/variants_items";

interface Input {
  id: IRecurring["id"]
}

type UseCaseInterface = IUseCase<Input, Recurring>

export default abstract class FindRecurringById implements UseCaseInterface {
  protected abstract variant: TypeOfVariants
  
  constructor( private repo_r: IRepoRecurring ){}
  
  async execute(input: Input): ReturnType<UseCaseInterface["execute"]> {
    const result_search = this.repo_r.find_by_id(input.id)

    if(!result_search.success){
      const scope = `FindRecurringById(${this.repo_r.find_by_id.name}) > ${result_search.error.scope}`
      return {
        success: false,
        error: {
          ...result_search.error,
          scope
        }
      }
    }

    return {
      success: true,
      data: result_search.data
    }
  }
}