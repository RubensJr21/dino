import { RepoInterfaceNames } from "@core-types/enum/RepoInterfaceNames";
import { UnionRepoInterfaces } from "@core-types/UnionRepoInterfaces";
import { UseCaseResult } from "@core-types/UseCaseResult";
import { TypeOfVariants } from "@core-types/variants_items";
import IUseCase from "@core/interfaces/IUseCase_v3";
import { Installment } from "@domain/entities/installment.entity";
import { IRepoInstallment } from "@domain/repositories/IRepoInstallment";

interface Input {
  id: number
}

type UsedRepoInterfaces = UnionRepoInterfaces<[
  IRepoInstallment
]>;

type UsedRepoInterfaceNames = UnionRepoInterfaces<[
  RepoInterfaceNames.Installment
]>;

type Return = UseCaseResult<
  "FindInstallmentById",
  Installment,
  UsedRepoInterfaces,
  UsedRepoInterfaceNames
>

type UseCaseInterface = IUseCase<Input, Return>

export default abstract class FindInstallmentById implements UseCaseInterface {
  protected abstract variant: TypeOfVariants
  
  constructor( private repo_i: IRepoInstallment ){}
  
  execute(input: Input): ReturnType<UseCaseInterface["execute"]> {
    const result_search = this.repo_i.find_by_id(input.id)

    if(!result_search.success){
      return {
        success: false,
        error: {
          ...result_search.error,
          trace: "FindInstallmentById > RepoInstallment"
        }
      }
    }

    return {
      success: true,
      data: result_search.data
    }
  }
}