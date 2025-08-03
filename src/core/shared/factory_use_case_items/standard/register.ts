import IUseCase from "@core/shared/IUseCase_v2";
import { Standard } from "@src/core/entities/standard.entity";
import { CreateItemValueParams, IRepoItemValue } from "../../interfaces/IRepoItemValue";
import { IRepoStandard } from "../../interfaces/IRepoStandard";
import { RepoInterfaceNames } from "../../types/RepoInterfaceNames";
import { UnionRepoInterfaces } from "../../types/UnionRepoInterfaces";
import { UnionRepoInterfacesNames } from "../../types/UnionRepoInterfacesNames";
import { UseCaseResult } from "../../types/UseCaseResult";
import { TypeOfVariants } from "../../types/variants_items";

type Input = CreateItemValueParams

type UsedRepoInterfaces = UnionRepoInterfaces<[
  IRepoStandard,
  IRepoItemValue
]>;

type UsedRepoInterfaceNames = UnionRepoInterfacesNames<[
  RepoInterfaceNames.Standard,
  RepoInterfaceNames.ItemValue
]>;

type Return = UseCaseResult<
  "RegisterStandard",
  Standard,
  UsedRepoInterfaces,
  UsedRepoInterfaceNames
>

type UseCaseInterface = IUseCase<Input, Return>

export default abstract class RegisterStandard implements UseCaseInterface {
  protected abstract variant: TypeOfVariants;
  constructor(
    private repo_s: IRepoStandard,
    private repo_iv: IRepoItemValue
  ){}
  async execute(input: Input): ReturnType<UseCaseInterface["execute"]> {
    const item_value_created = this.repo_iv.create(input)

    if(!item_value_created.success){
      return {
        success: false,
        error: {
          ...item_value_created.error,
          trace: "RegisterStandard > RepoItemValue"
        }
      }
    }

    const item_value_created_data = item_value_created.data

    const result_create = this.repo_s.create({
      fk_id_item_value: item_value_created_data.id
    })

    if(!result_create.success){
      return {
        success: false,
        error: {
          ...result_create.error,
          trace: "RegisterStandard > RepoStandard"
        }
      }
    }

    return {
      success: true,
      data: result_create.data
    }
  }
}