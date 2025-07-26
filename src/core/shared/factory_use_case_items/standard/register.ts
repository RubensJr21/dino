import IUseCase from "@core/shared/IUseCase";
import { Standard } from "@src/core/entities/standard.entity";
import { CreateItemValueParams, IRepoItemValue } from "../../interfaces/IRepoItemValue";
import { IRepoStandard } from "../../interfaces/IRepoStandard";
import { TypeOfVariants } from "../../types/variants_items";

type Input = CreateItemValueParams

type UseCaseInterface = IUseCase<Input, Standard>

export default abstract class RegisterStandard implements UseCaseInterface {
  protected abstract variant: TypeOfVariants;
  constructor(
    private repo_s: IRepoStandard,
    private repo_iv: IRepoItemValue
  ){}
  async execute(input: Input): ReturnType<UseCaseInterface["execute"]> {
    const item_value_created = this.repo_iv.create(input)

    if(!item_value_created.success){
      const scope = `RegisterStandard(${this.repo_s.create.name}) > ${item_value_created.error.scope}`
      return {
        success: false,
        error: {
          ...item_value_created.error,
          scope
        }
      }
    }

    const item_value_created_data = item_value_created.data

    const result_create = this.repo_s.create({
      fk_id_item_value: item_value_created_data.id
    })

    if(!result_create.success){
      const scope = `RegisterStandard(${this.repo_s.create.name}) > ${result_create.error.scope}`
      return {
        success: false,
        error: {
          ...result_create.error,
          scope
        }
      }
    }

    return {
      success: true,
      data: result_create.data
    }
  }
}