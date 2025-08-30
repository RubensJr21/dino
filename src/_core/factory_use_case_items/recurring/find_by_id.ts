import { RepoInterfaceNames } from "@core-types/enum/RepoInterfaceNames";
import { UnionRepoInterfaces } from "@core-types/UnionRepoInterfaces";
import { UnionRepoInterfacesNames } from "@core-types/UnionRepoInterfacesNames";
import { UseCaseResult } from "@core-types/UseCaseResult";
import { TypeOfVariants } from "@core-types/variants_items";
import IUseCase from "@core/interfaces/IUseCase_v3";
import { IRecurring, Recurring } from "@domain/entities/recurring.entity";
import { IRepoRecurring } from "@domain/repositories/IRepoRecurring";

interface Input {
  id: IRecurring["id"]
}

type UsedRepoInterfaces = UnionRepoInterfaces<[
  IRepoRecurring
]>;

type UsedRepoInterfaceNames = UnionRepoInterfacesNames<[
  RepoInterfaceNames.Recurring
]>;

type Return = UseCaseResult<
  "RegisterRecurring",
  Recurring,
  UsedRepoInterfaces,
  UsedRepoInterfaceNames
>

type UseCaseInterface = IUseCase<Input, Return>

export default abstract class FindRecurringById implements UseCaseInterface {
  protected abstract variant: TypeOfVariants
  
  constructor( private repo_r: IRepoRecurring ){}
  
  execute(input: Input): ReturnType<UseCaseInterface["execute"]> {
    const result_search = this.repo_r.find_by_id(input.id)

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