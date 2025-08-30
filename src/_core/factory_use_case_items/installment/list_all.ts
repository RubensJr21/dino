import { RepoInterfaceNames } from "@core-types/enum/RepoInterfaceNames";
import { UnionRepoInterfaces } from "@core-types/UnionRepoInterfaces";
import { UnionRepoInterfacesNames } from "@core-types/UnionRepoInterfacesNames";
import { UseCaseResult } from "@core-types/UseCaseResult";
import { TypeOfVariants } from "@core-types/variants_items";
import IUseCase from "@core/interfaces/IUseCase_v3";
import { Installment } from "@domain/entities/installment.entity";
import { IRepoInstallment } from "@domain/repositories/IRepoInstallment";

type Input = void;

type UsedRepoInterfaces = UnionRepoInterfaces<[
  IRepoInstallment
]>;

type UsedRepoInterfaceNames = UnionRepoInterfacesNames<[
  RepoInterfaceNames.Installment
]>;

type Return = UseCaseResult<
  "ListAllInstallments",
  Installment[],
  UsedRepoInterfaces,
  UsedRepoInterfaceNames
>

type UseCaseInterface = IUseCase<Input, Return>

export default abstract class ListAllInstallments implements UseCaseInterface {
  protected abstract variant: TypeOfVariants

  constructor(private repo_i: IRepoInstallment) { }

  execute(): ReturnType<UseCaseInterface["execute"]> {
    const result_search = this.repo_i.find_all_by_cashflow_type(this.variant);
    
    if(!result_search.success){
      return {
        success: false,
        error: {
          ...result_search.error,
          trace: "ListAllInstallments > RepoInstallment"
        }
      }
    }

    return {
      success: true,
      data: result_search.data
    }
  }
}