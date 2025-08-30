import { RepoInterfaceNames } from "@core-types/enum/RepoInterfaceNames";
import { UnionRepoInterfaces } from "@core-types/UnionRepoInterfaces";
import { UnionRepoInterfacesNames } from "@core-types/UnionRepoInterfacesNames";
import { UseCaseResult } from "@core-types/UseCaseResult";
import { TypeOfVariants } from "@core-types/variants_items";
import IUseCase from "@core/interfaces/IUseCase_v3";
import { Installment } from "@domain/entities/installment.entity";
import { ItemValue } from "@domain/entities/item_value.entity";
import { IRepoInstallment } from "@domain/repositories/IRepoInstallment";

interface Input {
  installment_id: Installment["id"]
}

type UsedRepoInterfaces = UnionRepoInterfaces<[
  IRepoInstallment
]>;

type UsedRepoInterfaceNames = UnionRepoInterfacesNames<[
  RepoInterfaceNames.Installment
]>;

type Return = UseCaseResult<
  "ListAllItemValueInstallments",
  ItemValue[],
  UsedRepoInterfaces,
  UsedRepoInterfaceNames
>

type UseCaseInterface = IUseCase<Input, Return>

export default abstract class ListAllItemValueInstallments implements UseCaseInterface {
  protected abstract variant: TypeOfVariants

  constructor(private repo_i: IRepoInstallment) { }

  execute(input: Input): ReturnType<UseCaseInterface["execute"]> {
    const result_search = this.repo_i.find_all_item_value(input.installment_id);
    
    if(!result_search.success){
      return {
        success: false,
        error: {
          ...result_search.error,
          trace: "ListAllItemValueInstallments > RepoInstallment"
        }
      }
    }

    return {
      success: true,
      data: result_search.data
    }
  }
}