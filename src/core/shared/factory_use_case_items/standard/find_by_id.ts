import IUseCase from "@core/shared/IUseCase";
import { Standard } from "@src/core/entities/standard.entity";
import { IRepoStandard } from "../../interfaces/IRepoStandard";
import { TypeOfVariants } from "../../types/variants_items";

interface Input {
  id: number
}

type UseCaseInterface = IUseCase<Input, Standard>

export default abstract class FindStandardById implements UseCaseInterface {
  protected abstract variant: TypeOfVariants;

  constructor(
    private repo_s: IRepoStandard,
  ){}
  
  async execute(input: Input): ReturnType<UseCaseInterface["execute"]> {
    const result_search = this.repo_s.findById(input.id)
    if(!result_search.success){
      const scope = `FindStandardById(${this.repo_s.findById.name}) > ${result_search.error.scope}`
      return {
        success: false,
        error: {
          ...result_search.error,
          scope
        }
      }
    }

    return {
      success: true,
      data: result_search.data
    }
  }
}