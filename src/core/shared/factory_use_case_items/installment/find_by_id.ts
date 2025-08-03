import IUseCase from "@core/shared/IUseCase_v2";
import { Installment } from "@src/core/entities/installment.entity";
import { IRepoInstallment } from "../../interfaces/IRepoInstallment";
import { RepoInterfaceNames } from "../../types/RepoInterfaceNames";
import { UnionRepoInterfaces } from "../../types/UnionRepoInterfaces";
import { UseCaseResult } from "../../types/UseCaseResult";
import { TypeOfVariants } from "../../types/variants_items";

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
  
  async execute(input: Input): ReturnType<UseCaseInterface["execute"]> {
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