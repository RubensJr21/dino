import IUseCase from "@core/shared/IUseCase_v2";
import { Recurring } from "@src/core/entities/recurring.entity";
import { IRepoRecurring } from "../../interfaces/IRepoRecurring";
import { RepoInterfaceNames } from "../../types/RepoInterfaceNames";
import { UnionRepoInterfaces } from "../../types/UnionRepoInterfaces";
import { UnionRepoInterfacesNames } from "../../types/UnionRepoInterfacesNames";
import { UseCaseResult } from "../../types/UseCaseResult";
import { TypeOfVariants } from "../../types/variants_items";

type UsedRepoInterfaces = UnionRepoInterfaces<[
  IRepoRecurring
]>;

type UsedRepoInterfaceNames = UnionRepoInterfacesNames<[
  RepoInterfaceNames.Recurring
]>;

type Return = UseCaseResult<
  "RegisterRecurring",
  Recurring[],
  UsedRepoInterfaces,
  UsedRepoInterfaceNames
>

type UseCaseInterface = IUseCase<void, Return>

export default abstract class ListAllRecurring implements UseCaseInterface {
  protected abstract variant: TypeOfVariants;
  
  constructor( private repo_r: IRepoRecurring ){}
  
  async execute(): ReturnType<UseCaseInterface["execute"]> {
    const result_search = this.repo_r.find_all_by_cashflow_type(this.variant);
    
    if(!result_search.success){
      return {
        success: false,
        error: {
          ...result_search.error,
          trace: "RegisterRecurring > RepoRecurring"
        }
      }
    }

    return {
      success: true,
      data: result_search.data
    }
  }
}