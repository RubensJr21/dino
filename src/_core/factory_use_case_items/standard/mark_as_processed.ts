import { RepoInterfaceNames } from "@core-types/enum/RepoInterfaceNames";
import { UnionRepoInterfaces } from "@core-types/UnionRepoInterfaces";
import { UnionRepoInterfacesNames } from "@core-types/UnionRepoInterfacesNames";
import { UseCaseResult } from "@core-types/UseCaseResult";
import { TypeOfVariants } from "@core-types/variants_items";
import IUseCase from "@core/interfaces/IUseCase_v3";
import { Standard } from "@domain/entities/standard.entity";
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
  "MarkStandardAsProcessed",
  Standard,
  UsedRepoInterfaces,
  UsedRepoInterfaceNames
>

type UseCaseInterface = IUseCase<Input, Return>

export default abstract class MarkStandardAsProcessed implements UseCaseInterface {
  protected abstract variant: TypeOfVariants;
  constructor(
    private repo_s: IRepoStandard,
    private repo_iv: IRepoItemValue
  ) { }
  execute(input: Input): ReturnType<UseCaseInterface["execute"]> {
    const result_search = this.repo_s.find_by_id(input.id)

    if(!result_search.success){
      return {
        success: false,
        error: {
          ...result_search.error,
          trace: "MarkStandardAsProcessed > RepoStandard"
        }
      }
    }

    const { item_value } = result_search.data

    item_value.markAsProcessed()
    const { id, tag, transfer_method, ...iv } = item_value.properties
    
    const result_updated = this.repo_iv.update(id, {
      ...iv,
      fk_id_tag: tag.id,
      fk_id_transfer_method: transfer_method.id
    })

    if(!result_updated.success){
      return {
        success: false,
        error: {
          ...result_updated.error,
          trace: "MarkStandardAsProcessed > RepoItemValue"
        }
      }
    }

    const result_search_after_update = this.repo_s.find_by_id(input.id);

    if(!result_search_after_update.success){
      return {
        success: false,
        error: {
          ...result_search_after_update.error,
          trace: "MarkStandardAsProcessed > RepoStandard"
        }
      }
    }

    return {
      success: true,
      data: result_search_after_update.data
    };
  }
}