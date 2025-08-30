import { RepoInterfaceNames } from "@core-types/enum/RepoInterfaceNames";
import { UnionRepoInterfaces } from "@core-types/UnionRepoInterfaces";
import { UnionRepoInterfacesNames } from "@core-types/UnionRepoInterfacesNames";
import { UseCaseResult } from "@core-types/UseCaseResult";
import { TypeOfVariants } from "@core-types/variants_items";
import IUseCase from "@core/interfaces/IUseCase_v3";
import { IRepoItemValue } from "@domain/repositories/IRepoItemValue";
import { IRepoStandard } from "@domain/repositories/IRepoStandard";

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