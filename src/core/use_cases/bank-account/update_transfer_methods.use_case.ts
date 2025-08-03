import { BankAccount } from "@core/entities/bank_account.entity";
import IUseCase from "@core/shared/IUseCase_v2";
import { IBankAccountTransferMethod } from "@src/core/entities/bank_account_transfer_method.entity";
import { IRepoBankAccount } from "@src/core/shared/interfaces/IRepoBankAccount";
import { IRepoBankAccountTransferMethod } from "@src/core/shared/interfaces/IRepoBankAccountTransferMethod";
import { RepoInterfaceNames } from "@src/core/shared/types/RepoInterfaceNames";
import { TypeOfTransferMethods } from "@src/core/shared/types/transfer_methods";
import { UnionRepoInterfaces } from "@src/core/shared/types/UnionRepoInterfaces";
import { UnionRepoInterfacesNames } from "@src/core/shared/types/UnionRepoInterfacesNames";
import { UseCaseResult } from "@src/core/shared/types/UseCaseResult";

interface Input extends Pick<IBankAccountTransferMethod, "id"> {
  type_of_bank_transfers: Record<TypeOfTransferMethods, boolean>
}
type UsedRepoInterfaces = UnionRepoInterfaces<[
  IRepoBankAccount,
  IRepoBankAccountTransferMethod
]>;

type UsedRepoInterfaceNames = UnionRepoInterfacesNames<[
  RepoInterfaceNames.BankAccount,
  RepoInterfaceNames.BankAccountTransferMethod
]>;

type Return = UseCaseResult<
  "UpdateTransferMethodsBankAccount",
  BankAccount,
  UsedRepoInterfaces,
  UsedRepoInterfaceNames
>

type UseCaseInterface = IUseCase<Input, Return>

export default class UpdateTransferMethodsBankAccount implements UseCaseInterface {
  constructor(
    private repo_ba: IRepoBankAccount,
    private repo_ba_tm: IRepoBankAccountTransferMethod
  ) { }
  async execute(input: Input): ReturnType<UseCaseInterface["execute"]> {
    const result_transfer_methods_all = this.repo_ba_tm.find_all_of_bank_account(input.id)

    if (!result_transfer_methods_all.success) {
      return {
        success: false,
        error: {
          ...result_transfer_methods_all.error,
          trace: "UpdateTransferMethodsBankAccount > RepoBankAccountTransferMethod"
        }
      }
    }

    const transfer_methods_data = result_transfer_methods_all.data

    for (const { id, bank_account, transfer_method } of transfer_methods_data) {
      const bk_tm_updated = this.repo_ba_tm.update(
        id,
        {
          fk_id_bank_account: bank_account.id,
          fk_id_transfer_method: transfer_method.id,
          is_disabled: input.type_of_bank_transfers[transfer_method.method]
        }
      )
      if (!bk_tm_updated.success) {
        return {
          success: false,
          error: {
            ...bk_tm_updated.error,
            trace: "UpdateTransferMethodsBankAccount > RepoBankAccountTransferMethod"
          }
        }
      }
    }

    const bank_account = this.repo_ba.find_by_id(input.id)

    if (!bank_account.success) {
      return {
        success: false,
        error: {
          ...bank_account.error,
          trace: "UpdateTransferMethodsBankAccount > RepoBankAccount"
        }
      }
    }

    return {
      success: true,
      data: bank_account.data
    }
  }
}