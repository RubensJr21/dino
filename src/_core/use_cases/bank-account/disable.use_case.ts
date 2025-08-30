import { RepoInterfaceNames } from "@core-types/enum/RepoInterfaceNames";
import { UnionRepoInterfaces } from "@core-types/UnionRepoInterfaces";
import { UnionRepoInterfacesNames } from "@core-types/UnionRepoInterfacesNames";
import { UseCaseResult } from "@core-types/UseCaseResult";
import IUseCase from "@core/interfaces/IUseCase_v3";
import { BankAccount } from "@domain/entities/bank_account.entity";
import { IRepoBankAccount } from "@domain/repositories/IRepoBankAccount";

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
  "DisableBankAccount",
  BankAccount,
  UsedRepoInterfaces,
  UsedRepoInterfaceNames
>

type UseCaseInterface = IUseCase<Input, Return>

export default class DisableBankAccount implements UseCaseInterface {
  constructor(private repo_ba: IRepoBankAccount) { }

  execute(input: Input): ReturnType<UseCaseInterface["execute"]> {
    const result = this.repo_ba.find_by_id(input.id)

    if(!result.success){
      return {
        success: false,
        error: {
          ...result.error,
          trace: "DisableBankAccount > RepoBankAccount"
        }
      }
    }

    const data = result.data

    data.disable()

    const { id, ...bank_account_without_id } = data.properties

    const bank_account_updated = this.repo_ba.update(id, bank_account_without_id)

    if(!bank_account_updated.success){
      return {
        success: false,
        error: {
          ...bank_account_updated.error,
          trace: "DisableBankAccount > RepoBankAccount"
        }
      }
    }
    
    return {
      success: true,
      data: bank_account_updated.data
    }
  }
}