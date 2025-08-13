import IUseCase from "@core/shared/IUseCase_v3";
import { Standard } from "@src/core/entities/standard.entity";
import { MItemValue } from "@src/core/models/item_value.model";
import IEntityBase from "../../interfaces/bases/IEntityBase";
import { IRepoItemValue } from "../../interfaces/IRepoItemValue";
import { IRepoStandard } from "../../interfaces/IRepoStandard";
import { RepoInterfaceNames } from "../../types/RepoInterfaceNames";
import { UnionRepoInterfaces } from "../../types/UnionRepoInterfaces";
import { UnionRepoInterfacesNames } from "../../types/UnionRepoInterfacesNames";
import { UseCaseResult } from "../../types/UseCaseResult";
import { TypeOfVariants } from "../../types/variants_items";

interface Input {
  id: IEntityBase["id"];
  data_item_value: StrictOmit<MItemValue, "id">
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
  "UpdateStandard",
  Standard,
  UsedRepoInterfaces,
  UsedRepoInterfaceNames
>

type UseCaseInterface = IUseCase<Input, Return>

export default abstract class UpdateStandard implements UseCaseInterface {
  protected abstract variant: TypeOfVariants;
  constructor(
    private repo_s: IRepoStandard,
    private repo_iv: IRepoItemValue
  ){}
  execute(input: Input): ReturnType<UseCaseInterface["execute"]> {
    const result_search = this.repo_s.find_by_id(input.id);

    if(!result_search.success){
      return {
        success: false,
        error: {
          ...result_search.error,
          trace: "UpdateStandard > RepoStandard"
        }
      }
    }

    const item_value_data = result_search.data.item_value

    const result_update = this.repo_iv.update(item_value_data.id, input.data_item_value)

    if(!result_update.success){
      return {
        success: false,
        error: {
          ...result_update.error,
          trace: "UpdateStandard > RepoItemValue"
        }
      }
    }

    const standard_updated = this.repo_s.find_by_id(input.id)

    if(!standard_updated.success){
      return {
        success: false,
        error: {
          ...standard_updated.error,
          trace: "UpdateStandard > RepoStandard"
        }
      }
    }

    return {
      success: true,
      data: standard_updated.data
    }
  }
}