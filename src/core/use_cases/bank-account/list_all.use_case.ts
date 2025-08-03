import { BankAccount } from "@core/entities/bank_account.entity";
import IUseCase from "@core/shared/IUseCase_v2";
import { IRepoBankAccount } from "@src/core/shared/interfaces/IRepoBankAccount";
import { RepoInterfaceNames } from "@src/core/shared/types/RepoInterfaceNames";
import { UnionRepoInterfaces } from "@src/core/shared/types/UnionRepoInterfaces";
import { UnionRepoInterfacesNames } from "@src/core/shared/types/UnionRepoInterfacesNames";
import { UseCaseResult } from "@src/core/shared/types/UseCaseResult";

type Input = void;

type UsedRepoInterfaces = UnionRepoInterfaces<[
  IRepoBankAccount
]>;

type UsedRepoInterfaceNames = UnionRepoInterfacesNames<[
  RepoInterfaceNames.BankAccount
]>;

type Return = UseCaseResult<
  "ListAllBankAccounts",
  BankAccount[],
  UsedRepoInterfaces,
  UsedRepoInterfaceNames
>

type UseCaseInterface = IUseCase<Input, Return>

export default class ListAllBankAccounts implements UseCaseInterface {
  constructor(private repo_ba: IRepoBankAccount) { }
  async execute(): ReturnType<UseCaseInterface["execute"]> {
    const result = this.repo_ba.find_all();
    if (!result.success) {
      return {
        success: false,
        error: {
          ...result.error,
          trace: "ListAllBankAccounts > RepoBankAccount"
        }
      }
    }

    return {
      success: true,
      data: result.data
    }
  }
}