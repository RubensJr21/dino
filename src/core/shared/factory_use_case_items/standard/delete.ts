import IUseCase from "@core/shared/IUseCase_v3";
import { IRepoItemValue } from "../../interfaces/IRepoItemValue";
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
  IRepoItemValue
]>;

type UsedRepoInterfaceNames = UnionRepoInterfacesNames<[
  RepoInterfaceNames.Standard,
  RepoInterfaceNames.ItemValue
]>;

type Return = UseCaseResult<
  "DeleteStandard",
  boolean,
  UsedRepoInterfaces,
  UsedRepoInterfaceNames
>

type UseCaseInterface = IUseCase<Input, Return>

export default abstract class DeleteStandard implements UseCaseInterface {
  protected abstract variant: TypeOfVariants
  constructor(
    private repo_s: IRepoStandard,
    private repo_iv: IRepoItemValue
  ) { }
  execute(input: Input): ReturnType<UseCaseInterface["execute"]> {
    // Removendo o item_value a remoção é propagada
    const result_search = this.repo_s.find_by_id(input.id)
    if(!result_search.success){
      return {
        success: false,
        error: {
          ...result_search.error,
          trace: "DeleteStandard > RepoStandard"
        }
      }
    }

    const standard = result_search.data

    const result_deleted = this.repo_iv.delete(standard.item_value.id)

    if(!result_deleted.success){
      return {
        success: false,
        error: {
          ...result_deleted.error,
          trace: "DeleteStandard > RepoItemValue"
        }
      }
    }

    return {
      success: true,
      data: result_deleted.data
    }
  }
}