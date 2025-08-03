import { BankAccount } from "@core/entities/bank_account.entity";
import IUseCase from "@core/shared/IUseCase_v2";
import { IRepoBankAccount } from "@src/core/shared/interfaces/IRepoBankAccount";
import { RepoInterfaceNames } from "@src/core/shared/types/RepoInterfaceNames";
import { UnionRepoInterfaces } from "@src/core/shared/types/UnionRepoInterfaces";
import { UnionRepoInterfacesNames } from "@src/core/shared/types/UnionRepoInterfacesNames";
import { UseCaseResult } from "@src/core/shared/types/UseCaseResult";

interface Input {
  id: number,
  new_balance: number
}

type UsedRepoInterfaces = UnionRepoInterfaces<[
  IRepoBankAccount
]>;

type UsedRepoInterfaceNames = UnionRepoInterfacesNames<[
  RepoInterfaceNames.BankAccount
]>;

type Return = UseCaseResult<
  "UpdateBalanceBankAccount",
  BankAccount,
  UsedRepoInterfaces,
  UsedRepoInterfaceNames
>

type UseCaseInterface = IUseCase<Input, Return>

export default class UpdateBalanceBankAccount implements UseCaseInterface {
  constructor(private repo_ba: IRepoBankAccount) { }
  async execute(input: Input): ReturnType<UseCaseInterface["execute"]> {
    const result_search = this.repo_ba.find_by_id(input.id)

    if (!result_search.success) {
      return {
        success: false,
        error: {
          ...result_search.error,
          trace: "UpdateBalanceBankAccount > RepoBankAccount"
        }
      }
    }

    const data = result_search.data

    data.change_balance(input.new_balance);

    const { id, ...bank_account_without_id } = data.properties;

    const result_update = this.repo_ba.update(id, bank_account_without_id);

    if (!result_update.success) {
      return {
        success: false,
        error: {
          ...result_update.error,
          trace: "UpdateBalanceBankAccount > RepoBankAccount"
        }
      }
    }

    return {
      success: true,
      data: result_update.data
    }
  }
}