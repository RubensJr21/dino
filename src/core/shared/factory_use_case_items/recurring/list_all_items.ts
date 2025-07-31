import IUseCase from "@core/shared/IUseCase";
import { ItemValue } from "@src/core/entities/item_value.entity";
import { Recurring } from "@src/core/entities/recurring.entity";
import { IRepoRecurring } from "../../interfaces/IRepoRecurring";
import { TypeOfVariants } from "../../types/variants_items";

interface Input {
  recurring_id: Recurring["id"]
}

type UseCaseInterface = IUseCase<Input, ItemValue[]>

export default abstract class ListAllRecurringItems implements UseCaseInterface {
  protected abstract variant: TypeOfVariants;
  
  constructor( private repo_r: IRepoRecurring ){}
  
  async execute(input: Input): ReturnType<UseCaseInterface["execute"]> {
    const result_search = this.repo_r.findAllItemValue(input.recurring_id);
    
    if(!result_search.success){
      const scope = `ListAllRecurringItems(${this.repo_r.findAllItemValue.name}) > ${result_search.error.scope}`
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