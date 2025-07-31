import IUseCase from "@core/shared/IUseCase";
import { Standard } from "@src/core/entities/standard.entity";
import { MItemValue } from "@src/core/models/item_value.model";
import IEntityBase from "../../interfaces/bases/IEntityBase";
import { IRepoItemValue } from "../../interfaces/IRepoItemValue";
import { IRepoStandard } from "../../interfaces/IRepoStandard";
import { TypeOfVariants } from "../../types/variants_items";

interface Input {
  id: IEntityBase["id"];
  data_item_value: StrictOmit<MItemValue, "id">
}

type UseCaseInterface = IUseCase<Input, Standard>

export default abstract class UpdateStandard implements UseCaseInterface {
  protected abstract variant: TypeOfVariants;
  constructor(
    private repo_s: IRepoStandard,
    private repo_iv: IRepoItemValue
  ){}
  async execute(input: Input): ReturnType<UseCaseInterface["execute"]> {
    const result_search = this.repo_s.find_by_id(input.id);

    if(!result_search.success){
      const scope = `UpdateStandard(${this.repo_s.find_by_id.name}) > ${result_search.error.scope}`
      return {
        success: false,
        error: {
          ...result_search.error,
          scope
        }
      }
    }

    const item_value_data = result_search.data.item_value

    const result_update = this.repo_iv.update(item_value_data.id, input.data_item_value)

    if(!result_update.success){
      const scope = `UpdateStandard(${this.repo_iv.create.name}) > ${result_update.error.scope}`
      return {
        success: false,
        error: {
          ...result_update.error,
          scope
        }
      }
    }

    const standard_updated = this.repo_s.find_by_id(input.id)

    if(!standard_updated.success){
      const scope = `UpdateStandard(${this.repo_s.find_by_id.name}) > ${standard_updated.error.scope}`
      return {
        success: false,
        error: {
          ...standard_updated.error,
          scope
        }
      }
    }

    return {
      success: true,
      data: standard_updated.data
    }
  }
}