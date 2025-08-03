import { BankAccount } from "@core/entities/bank_account.entity";
import IUseCase from "@core/shared/IUseCase_v2";
import { IRepoBankAccount } from "@src/core/shared/interfaces/IRepoBankAccount";
import { RepoInterfaceNames } from "@src/core/shared/types/RepoInterfaceNames";
import { UnionRepoInterfaces } from "@src/core/shared/types/UnionRepoInterfaces";
import { UnionRepoInterfacesNames } from "@src/core/shared/types/UnionRepoInterfacesNames";
import { UseCaseResult } from "@src/core/shared/types/UseCaseResult";

interface Input {
  id: number,
  new_nickname: string
}

type UsedRepoInterfaces = UnionRepoInterfaces<[
  IRepoBankAccount
]>;

type UsedRepoInterfaceNames = UnionRepoInterfacesNames<[
  RepoInterfaceNames.BankAccount
]>;

type Return = UseCaseResult<
  "UpdateNicknameBankAccount",
  BankAccount,
  UsedRepoInterfaces,
  UsedRepoInterfaceNames
>

type UseCaseInterface = IUseCase<Input, Return>

export default class UpdateNicknameBankAccount implements UseCaseInterface {
  constructor(private repo_ba: IRepoBankAccount) { }
  async execute(input: Input): ReturnType<UseCaseInterface["execute"]> {
    const result_searched_nickname = this.repo_ba.find_by_nickname(input.new_nickname)

    if (result_searched_nickname.success) {
      const bank_account_data = result_searched_nickname.data
      if (bank_account_data.id !== input.id) {
        return {
          success: false,
          error: {
            code: "nickname_already_used",
            trace: "UpdateNicknameBankAccount > RepoBankAccount",
            method: "find_by_nickname",
            message: `O nickname '${input.new_nickname}' já está sendo utilizado!`
          }
        }
      }
    }

    const result_search = this.repo_ba.find_by_id(input.id)

    if (!result_search.success) {
      return {
        success: false,
        error: {
          ...result_search.error,
          trace: "UpdateNicknameBankAccount > RepoBankAccount"
        }
      }
    }

    const bank_account_data = result_search.data

    bank_account_data.change_nickname(input.new_nickname)
    const { id, ...bank_account_without_id } = bank_account_data.properties

    const result_update = this.repo_ba.update(id, bank_account_without_id);

    if (!result_update.success) {
      return {
        success: false,
        error: {
          ...result_update.error,
          trace: "UpdateNicknameBankAccount > RepoBankAccount"
        }
      }
    }

    return {
      success: true,
      data: result_update.data
    }
  }
}