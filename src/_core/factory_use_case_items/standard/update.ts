import IUseCase from "@core/interfaces/IUseCase_v3";
import { MItemValue } from "@core/models/item_value.model";
import { RepoInterfaceNames } from "@core/types/enum/RepoInterfaceNames";
import { UnionRepoInterfaces } from "@core/types/UnionRepoInterfaces";
import { UnionRepoInterfacesNames } from "@core/types/UnionRepoInterfacesNames";
import { UseCaseResult } from "@core/types/UseCaseResult";
import { TypeOfVariants } from "@core/types/variants_items";
import IEntityBase from "@domain/entities/IEntityBase";
import { Standard } from "@domain/entities/standard.entity";
import { IRepoItemValue } from "@domain/repositories/IRepoItemValue";
import { IRepoStandard } from "@domain/repositories/IRepoStandard";

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