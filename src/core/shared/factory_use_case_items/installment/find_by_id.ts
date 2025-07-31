import IUseCase from "@core/shared/IUseCase";
import { Installment } from "@src/core/entities/installment.entity";
import { IRepoInstallment } from "../../interfaces/IRepoInstallment";
import { TypeOfVariants } from "../../types/variants_items";

interface Input {
  id: number
}

type UseCaseInterface = IUseCase<Input, Installment>

export default abstract class FindInstallmentById implements UseCaseInterface {
  protected abstract variant: TypeOfVariants
  
  constructor( private repo_i: IRepoInstallment ){}
  
  async execute(input: Input): ReturnType<UseCaseInterface["execute"]> {
    const result_search = this.repo_i.find_by_id(input.id)

    if(!result_search.success){
      const scope = `FindInstallmentById(${this.repo_i.find_by_id.name}) > ${result_search.error.scope}`
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