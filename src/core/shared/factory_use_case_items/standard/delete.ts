import IUseCase from "@core/shared/IUseCase";
import { IRepoItemValue } from "../../interfaces/IRepoItemValue";
import { IRepoStandard } from "../../interfaces/IRepoStandard";
import { TypeOfVariants } from "../../types/variants_items";

interface Input {
  id: number
}

type UseCaseInterface = IUseCase<Input, boolean>

export default abstract class DeleteStandard implements UseCaseInterface {
  protected abstract variant: TypeOfVariants
  constructor(
    private repo_s: IRepoStandard,
    private repo_iv: IRepoItemValue
  ) { }
  async execute(input: Input): ReturnType<UseCaseInterface["execute"]> {
    // Removendo o item_value a remoção é propagada
    const result_search = this.repo_s.find_by_id(input.id)
    if(!result_search.success){
      const scope = `DeleteStandard(${this.repo_s.find_by_id.name}) > ${result_search.error.scope}`
      return {
        success: false,
        error: {
          ...result_search.error,
          scope
        }
      }
    }

    const standard = result_search.data

    const result_deleted = this.repo_iv.delete(standard.item_value.id)

    if(!result_deleted.success){
      const scope = `DeleteStandard(${this.repo_s.delete.name}) > ${result_deleted.error.scope}`
      return {
        success: false,
        error: {
          ...result_deleted.error,
          scope
        }
      }
    }

    return {
      success: true,
      data: result_deleted.data
    }
  }
}