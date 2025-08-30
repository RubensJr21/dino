import { RepoInterfaceNames } from "@core-types/enum/RepoInterfaceNames";
import { UnionRepoInterfaces } from "@core-types/UnionRepoInterfaces";
import { UnionRepoInterfacesNames } from "@core-types/UnionRepoInterfacesNames";
import { UseCaseResult } from "@core-types/UseCaseResult";
import IUseCase from "@core/interfaces/IUseCase_v3";
import { BankAccount } from "@domain/entities/bank_account.entity";
import { IRepoBankAccount } from "@domain/repositories/IRepoBankAccount";

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
  execute(): ReturnType<UseCaseInterface["execute"]> {
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