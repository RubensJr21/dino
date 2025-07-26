import IUseCase from "@core/shared/IUseCase";
import { Standard } from "@src/core/entities/standard.entity";
import { IRepoItemValue } from "../../interfaces/IRepoItemValue";
import { IRepoStandard } from "../../interfaces/IRepoStandard";
import { TypeOfVariants } from "../../types/variants_items";

interface Input {
  id: number
}

type UseCaseInterface = IUseCase<Input, Standard>

export default abstract class MarkStandardAsProcessed implements UseCaseInterface {
  protected abstract variant: TypeOfVariants;
  constructor(
    private repo_s: IRepoStandard,
    private repo_iv: IRepoItemValue
  ) { }
  async execute(input: Input): ReturnType<UseCaseInterface["execute"]> {
    const result_search = this.repo_s.findById(input.id)

    if(!result_search.success){
      const scope = `MarkStandardAsProcessed(${this.repo_s.findById.name}) > ${result_search.error.scope}`
      return {
        success: false,
        error: {
          ...result_search.error,
          scope
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
      const scope = `MarkStandardAsProcessed(${this.repo_iv.update.name}) > ${result_updated.error.scope}`
      return {
        success: false,
        error: {
          ...result_updated.error,
          scope
        }
      }
    }

    const result_search_after_update = this.repo_s.findById(input.id);

    if(!result_search_after_update.success){
      const scope = `MarkStandardAsProcessed(${this.repo_iv.findById.name}) > ${result_search_after_update.error.scope}`
      return {
        success: false,
        error: {
          ...result_search_after_update.error,
          scope
        }
      }
    }

    return {
      success: true,
      data: result_search_after_update.data
    };
  }
}