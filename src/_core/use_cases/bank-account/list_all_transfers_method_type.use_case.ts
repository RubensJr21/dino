import { RepoInterfaceNames } from "@core-types/enum/RepoInterfaceNames";
import { UnionRepoInterfaces } from "@core-types/UnionRepoInterfaces";
import { UnionRepoInterfacesNames } from "@core-types/UnionRepoInterfacesNames";
import { UseCaseResult } from "@core-types/UseCaseResult";
import IUseCase from "@core/interfaces/IUseCase_v3";
import { BankAccount } from "@domain/entities/bank_account.entity";
import { BankAccountTransferMethod } from "@domain/entities/bank_account_transfer_method.entity";
import { IRepoBankAccountTransferMethod } from "@domain/repositories/IRepoBankAccountTransferMethod";

interface Input {
  id: BankAccount["id"]
}

type UsedRepoInterfaces = UnionRepoInterfaces<[
  IRepoBankAccountTransferMethod
]>;

type UsedRepoInterfaceNames = UnionRepoInterfacesNames<[
  RepoInterfaceNames.BankAccountTransferMethod
]>;

type Return = UseCaseResult<
  "ListAllTransfersMethodTypeBankAccount",
  BankAccountTransferMethod[],
  UsedRepoInterfaces,
  UsedRepoInterfaceNames
>

type UseCaseInterface = IUseCase<Input, Return>

export default class ListAllTransfersMethodTypeBankAccount implements UseCaseInterface {
  constructor(
    private repo_ba_tm: IRepoBankAccountTransferMethod
  ) { }
  execute({ id }: Input): ReturnType<UseCaseInterface["execute"]> {
    const result = this.repo_ba_tm.find_all_of_bank_account(id)

    if (!result.success) {
      return {
        success: false,
        error: {
          ...result.error,
          trace: "ListAllTransfersMethodTypeBankAccount > RepoBankAccountTransferMethod"
        }
      }
    }

    if (result.data.length === 0) {
      return {
        success: false,
        error: {
          trace: "ListAllTransfersMethodTypeBankAccount",
          method: "verification_in_use_case",
          code: "empty_list",
          message: "A lista de métodos de transferência está vazia."
        }
      }
    }

    return {
      success: true,
      data: result.data
    }
  }
}