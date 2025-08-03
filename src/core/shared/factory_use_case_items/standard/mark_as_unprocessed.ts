import IUseCase from "@core/shared/IUseCase_v2";
import { Standard } from "@src/core/entities/standard.entity";
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
  "MarkStandardAsUnProcessed",
  Standard,
  UsedRepoInterfaces,
  UsedRepoInterfaceNames
>

type UseCaseInterface = IUseCase<Input, Return>

export default abstract class MarkStandardAsUnProcessed implements UseCaseInterface {
  protected abstract variant: TypeOfVariants;
  constructor(
    private repo_s: IRepoStandard,
    private repo_iv: IRepoItemValue
  ) { }
  async execute(input: Input): ReturnType<UseCaseInterface["execute"]> {
    const result_search = this.repo_s.find_by_id(input.id)

    if(!result_search.success){
      return {
        success: false,
        error: {
          ...result_search.error,
          trace: "MarkStandardAsUnProcessed > RepoStandard"
        }
      }
    }

    const { item_value } = result_search.data

    item_value.markAsUnprocessed()
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
          trace: "MarkStandardAsUnProcessed > RepoItemValue"
        }
      }
    }

    const result_search_after_update = this.repo_s.find_by_id(input.id);

    if(!result_search_after_update.success){
      return {
        success: false,
        error: {
          ...result_search_after_update.error,
          trace: "MarkStandardAsUnProcessed > RepoStandard"
        }
      }
    }

    return {
      success: true,
      data: result_search_after_update.data
    };
  }
}