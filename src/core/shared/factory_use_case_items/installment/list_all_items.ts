import IUseCase from "@core/shared/IUseCase";
import { Installment } from "@src/core/entities/installment.entity";
import { ItemValue } from "@src/core/entities/item_value.entity";
import { IRepoInstallment } from "../../interfaces/IRepoInstallment";
import { TypeOfVariants } from "../../types/variants_items";

interface Input {
  installment_id: Installment["id"]
}

type UseCaseInterface = IUseCase<Input, ItemValue[]>

export default abstract class ListAllItemValueInstallments implements UseCaseInterface {
  protected abstract variant: TypeOfVariants

  constructor(private repo_i: IRepoInstallment) { }

  async execute(input: Input): ReturnType<UseCaseInterface["execute"]> {
    const result_search = this.repo_i.findAllItemValue(input.installment_id);
    
    if(!result_search.success){
      const scope = `ListAllItemValueInstallments(${this.repo_i.findAllItemValue.name}) > ${result_search.error.scope}`
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