import IUseCase from "@core/shared/IUseCase_v3";
import { Standard } from "@src/core/entities/standard.entity";
import { IRepoStandard } from "../../interfaces/IRepoStandard";
import { RepoInterfaceNames } from "../../types/RepoInterfaceNames";
import { UnionRepoInterfaces } from "../../types/UnionRepoInterfaces";
import { UnionRepoInterfacesNames } from "../../types/UnionRepoInterfacesNames";
import { UseCaseResult } from "../../types/UseCaseResult";
import { TypeOfVariants } from "../../types/variants_items";

interface Input {
  id: number
}

type UsedRepoInterfaces = UnionRepoInterfaces<[
  IRepoStandard,
]>;

type UsedRepoInterfaceNames = UnionRepoInterfacesNames<[
  RepoInterfaceNames.Standard,
]>;

type Return = UseCaseResult<
  "FindStandardById",
  Standard,
  UsedRepoInterfaces,
  UsedRepoInterfaceNames
>

type UseCaseInterface = IUseCase<Input, Return>

export default abstract class FindStandardById implements UseCaseInterface {
  protected abstract variant: TypeOfVariants;

  constructor(
    private repo_s: IRepoStandard,
  ){}
  
  execute(input: Input): ReturnType<UseCaseInterface["execute"]> {
    const result_search = this.repo_s.find_by_id(input.id)
    if(!result_search.success){
      const scope = `FindStandardById(${this.repo_s.find_by_id.name}) > ${result_search.error.scope}`
      return {
        success: false,
        error: {
          ...result_search.error,
          trace: "FindStandardById > RepoStandard"
        }
      }
    }

    return {
      success: true,
      data: result_search.data
    }
  }
}