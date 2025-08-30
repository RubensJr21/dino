import { RepoInterfaceNames } from "@core-types/enum/RepoInterfaceNames";
import { UnionRepoInterfaces } from "@core-types/UnionRepoInterfaces";
import { UnionRepoInterfacesNames } from "@core-types/UnionRepoInterfacesNames";
import { UseCaseResult } from "@core-types/UseCaseResult";
import { TypeOfVariants } from "@core-types/variants_items";
import IUseCase from "@core/interfaces/IUseCase_v3";
import { Standard } from "@domain/entities/standard.entity";
import { IRepoStandard } from "@domain/repositories/IRepoStandard";

type Input = void

type UsedRepoInterfaces = UnionRepoInterfaces<[
  IRepoStandard,
]>;

type UsedRepoInterfaceNames = UnionRepoInterfacesNames<[
  RepoInterfaceNames.Standard,
]>;

type Return = UseCaseResult<
  "ListAllStandards",
  Standard[],
  UsedRepoInterfaces,
  UsedRepoInterfaceNames
>

type UseCaseInterface = IUseCase<Input, Return>

export default abstract class ListAllStandards implements UseCaseInterface {
  protected abstract variant: TypeOfVariants;
  
  constructor(
    private repo_s: IRepoStandard,
  ){}
  execute(): ReturnType<UseCaseInterface["execute"]> {
    const result_search = this.repo_s.find_all_by_cashflow_type(this.variant);
    
    if(!result_search.success){
      return {
        success: false,
        error: {
          ...result_search.error,
          trace: "ListAllStandards > RepoStandard"
        }
      }
    }

    return {
      success: true,
      data: result_search.data
    }
  }
}