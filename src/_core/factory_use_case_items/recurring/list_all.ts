import { RepoInterfaceNames } from "@core-types/enum/RepoInterfaceNames";
import { UnionRepoInterfaces } from "@core-types/UnionRepoInterfaces";
import { UnionRepoInterfacesNames } from "@core-types/UnionRepoInterfacesNames";
import { UseCaseResult } from "@core-types/UseCaseResult";
import { TypeOfVariants } from "@core-types/variants_items";
import IUseCase from "@core/interfaces/IUseCase_v3";
import { Recurring } from "@domain/entities/recurring.entity";
import { IRepoRecurring } from "@domain/repositories/IRepoRecurring";

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
  
  execute(): ReturnType<UseCaseInterface["execute"]> {
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