import IUseCase from "@core/shared/IUseCase";
import { Installment } from "@src/core/entities/installment.entity";
import { IRepoInstallment } from "../../interfaces/IRepoInstallment";
import { TypeOfVariants } from "../../types/variants_items";

type UseCaseInterface = IUseCase<void, Installment[]>

export default abstract class ListAllInstallments implements UseCaseInterface {
  protected abstract variant: TypeOfVariants

  constructor(private repo_i: IRepoInstallment) { }

  async execute(): ReturnType<UseCaseInterface["execute"]> {
    const result_search = this.repo_i.find_all_by_cashflow_type(this.variant);
    
    if(!result_search.success){
      const scope = `ListAllInstallments(${this.repo_i.find_all_by_cashflow_type.name}) > ${result_search.error.scope}`
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