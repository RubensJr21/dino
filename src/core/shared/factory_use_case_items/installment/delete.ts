import IUseCase from "@core/shared/IUseCase_v3";
import { IRepoInstallment } from "../../interfaces/IRepoInstallment";
import { RepoInterfaceNames } from "../../types/RepoInterfaceNames";
import { UnionRepoInterfaces } from "../../types/UnionRepoInterfaces";
import { UnionRepoInterfacesNames } from "../../types/UnionRepoInterfacesNames";
import { UseCaseResult } from "../../types/UseCaseResult";
import { TypeOfVariants } from "../../types/variants_items";

interface Input {
  id: number
}

type UsedRepoInterfaces = UnionRepoInterfaces<[
  IRepoInstallment
]>;

type UsedRepoInterfaceNames = UnionRepoInterfacesNames<[
  RepoInterfaceNames.Installment
]>;

type Return = UseCaseResult<
  "DeleteInstallment",
  boolean,
  UsedRepoInterfaces,
  UsedRepoInterfaceNames
>

type UseCaseInterface = IUseCase<Input, Return>

export default abstract class DeleteInstallment implements UseCaseInterface {
  protected abstract variant: TypeOfVariants

  constructor(private repo_i: IRepoInstallment) { }
  
  execute(input: Input): ReturnType<UseCaseInterface["execute"]> {
    const result_deleted = this.repo_i.delete(input.id)
    if (!result_deleted.success) {
      return {
        success: false,
        error: {
          ...result_deleted.error,
          trace: "DeleteInstallment > RepoInstallment"
        }
      }
    }

    return {
      success: true,
      data: result_deleted.data
    }
  }
}