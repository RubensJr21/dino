import IUseCase from "@core/shared/IUseCase_v3";
import { Standard } from "@src/core/entities/standard.entity";
import { IRepoStandard } from "../../interfaces/IRepoStandard";
import { RepoInterfaceNames } from "../../types/RepoInterfaceNames";
import { UnionRepoInterfaces } from "../../types/UnionRepoInterfaces";
import { UnionRepoInterfacesNames } from "../../types/UnionRepoInterfacesNames";
import { UseCaseResult } from "../../types/UseCaseResult";
import { TypeOfVariants } from "../../types/variants_items";

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