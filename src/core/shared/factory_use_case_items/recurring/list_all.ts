import IUseCase from "@core/shared/IUseCase";
import { Recurring } from "@src/core/entities/recurring.entity";
import { IRepoRecurring } from "../../interfaces/IRepoRecurring";
import { TypeOfVariants } from "../../types/variants_items";

type UseCaseInterface = IUseCase<void, Recurring[]>

export default abstract class ListAllRecurring implements UseCaseInterface {
  protected abstract variant: TypeOfVariants;
  
  constructor( private repo_r: IRepoRecurring ){}
  
  async execute(): ReturnType<UseCaseInterface["execute"]> {
    console.log("ListAllRecurring")
    const result_search = this.repo_r.find_all_by_cashflow_type(this.variant);
    
    if(!result_search.success){
      const scope = `ListAllInstallments(${this.repo_r.find_all_by_cashflow_type.name}) > ${result_search.error.scope}`
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