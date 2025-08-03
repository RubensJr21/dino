import { BankAccount } from "@core/entities/bank_account.entity";
import IUseCase from "@core/shared/IUseCase_v2";
import { IRepoBankAccount } from "@src/core/shared/interfaces/IRepoBankAccount";
import { RepoInterfaceNames } from "@src/core/shared/types/RepoInterfaceNames";
import { UnionRepoInterfaces } from "@src/core/shared/types/UnionRepoInterfaces";
import { UnionRepoInterfacesNames } from "@src/core/shared/types/UnionRepoInterfacesNames";
import { UseCaseResult } from "@src/core/shared/types/UseCaseResult";

interface Input {
  id: number,
}

type UsedRepoInterfaces = UnionRepoInterfaces<[
  IRepoBankAccount
]>;

type UsedRepoInterfaceNames = UnionRepoInterfacesNames<[
  RepoInterfaceNames.BankAccount
]>;

type Return = UseCaseResult<
  "EnableBankAccount",
  BankAccount,
  UsedRepoInterfaces,
  UsedRepoInterfaceNames
>

type UseCaseInterface = IUseCase<Input, Return>

export default class EnableBankAccount implements UseCaseInterface {
  constructor(private repo_ba: IRepoBankAccount) { }

  async execute(input: Input): ReturnType<UseCaseInterface["execute"]> {
    const result = this.repo_ba.find_by_id(input.id)

    if(!result.success){
      return {
        success: false,
        error: {
          ...result.error,
          trace: "EnableBankAccount > RepoBankAccount"
        }
      }
    }

    const data = result.data

    data.enable()

    const { id, ...bank_account_without_id } = data.properties

    const bank_account_updated = this.repo_ba.update(id, bank_account_without_id)

    if(!bank_account_updated.success){
      return {
        success: false,
        error: {
          ...bank_account_updated.error,
          trace: "EnableBankAccount > RepoBankAccount"
        }
      }
    }
    
    return {
      success: true,
      data: bank_account_updated.data
    }
  }
}