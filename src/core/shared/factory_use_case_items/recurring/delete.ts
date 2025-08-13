import IUseCase from "@core/shared/IUseCase_v3";
import { IRecurring } from "@src/core/entities/recurring.entity";
import { IRepoRecurring } from "../../interfaces/IRepoRecurring";
import { RepoInterfaceNames } from "../../types/RepoInterfaceNames";
import { UnionRepoInterfaces } from "../../types/UnionRepoInterfaces";
import { UnionRepoInterfacesNames } from "../../types/UnionRepoInterfacesNames";
import { UseCaseResult } from "../../types/UseCaseResult";
import { TypeOfVariants } from "../../types/variants_items";

interface Input {
  id: IRecurring["id"]
}

type UsedRepoInterfaces = UnionRepoInterfaces<[
  IRepoRecurring
]>;

type UsedRepoInterfaceNames = UnionRepoInterfacesNames<[
  RepoInterfaceNames.Recurring
]>;

type Return = UseCaseResult<
  "DeleteRecurring",
  boolean,
  UsedRepoInterfaces,
  UsedRepoInterfaceNames
>

type UseCaseInterface = IUseCase<Input, Return>

export default abstract class DeleteRecurring implements UseCaseInterface {
  protected abstract variant: TypeOfVariants;

  constructor(
    private repo_r: IRepoRecurring
  ){}

  execute(input: Input): ReturnType<UseCaseInterface["execute"]> {
    const result_deleted = this.repo_r.delete(input.id)

    if (!result_deleted.success) {
      return {
        success: false,
        error: {
          ...result_deleted.error,
          trace: "DeleteRecurring > RepoRecurring"
        }
      };
    }

    return {
      success: true,
      data: result_deleted.data
    }
  }
}