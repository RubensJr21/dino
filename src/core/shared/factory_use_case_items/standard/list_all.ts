import IUseCase from "@core/shared/IUseCase";
import { Standard } from "@src/core/entities/standard.entity";
import { IRepoStandard } from "../../interfaces/IRepoStandard";
import { TypeOfVariants } from "../../types/variants_items";

type UseCaseInterface = IUseCase<void, Standard[]>

export default abstract class ListAllStandards implements UseCaseInterface {
  protected abstract variant: TypeOfVariants;
  
  constructor(
    private repo_s: IRepoStandard,
  ){}
  async execute(): ReturnType<UseCaseInterface["execute"]> {
    const result_search = this.repo_s.findAllByCashflowType(this.variant);
    
    if(!result_search.success){
      const scope = `ListAllStandards(${this.repo_s.findById.name}) > ${result_search.error.scope}`
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