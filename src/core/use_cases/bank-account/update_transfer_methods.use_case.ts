import { BankAccount } from "@core/entities/bank_account.entity";
import IUseCase from "@core/shared/IUseCase_v3";
import { IBankAccountTransferMethod } from "@src/core/entities/bank_account_transfer_method.entity";
import { IRepoBankAccount } from "@src/core/shared/interfaces/IRepoBankAccount";
import { IRepoBankAccountTransferMethod } from "@src/core/shared/interfaces/IRepoBankAccountTransferMethod";
import { IRepoTransferMethod } from "@src/core/shared/interfaces/IRepoTransferMethod";
import { RepoInterfaceNames } from "@src/core/shared/types/RepoInterfaceNames";
import { UnionRepoInterfaces } from "@src/core/shared/types/UnionRepoInterfaces";
import { UnionRepoInterfacesNames } from "@src/core/shared/types/UnionRepoInterfacesNames";
import { UseCaseResult } from "@src/core/shared/types/UseCaseResult";

interface Input extends Pick<IBankAccountTransferMethod, "id"> {
  type_of_bank_transfers: Array<string>
}
type UsedRepoInterfaces = UnionRepoInterfaces<[
  IRepoBankAccount,
  IRepoBankAccountTransferMethod,
  IRepoTransferMethod
]>;

type UsedRepoInterfaceNames = UnionRepoInterfacesNames<[
  RepoInterfaceNames.BankAccount,
  RepoInterfaceNames.BankAccountTransferMethod,
  RepoInterfaceNames.TransferMethod
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
    private repo_ba_tm: IRepoBankAccountTransferMethod,
    private repo_tm: IRepoTransferMethod,
  ) { }
  execute(input: Input): ReturnType<UseCaseInterface["execute"]> {
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

    const result_all_available_transfer_methods = this.repo_tm.find_all()

    if (!result_all_available_transfer_methods.success) {
      return {
        success: false,
        error: {
          ...result_all_available_transfer_methods.error,
          trace: "UpdateTransferMethodsBankAccount > RepoTransferMethod"
        }
      }
    }

    // Quando um banco é adicionado é necessário popular a tabela de bank_account_transfer_method
    const available_transfer_methods = result_all_available_transfer_methods.data.map((tm) => tm.method)

    // Verifica se nenhum método de transferência foi cadastrado
    if (available_transfer_methods.length === 0) {
      return {
        success: false,
        error: {
          trace: "UpdateTransferMethodsBankAccount",
          method: "verification_in_use_case",
          code: "empty_list",
          message: "Nenhum método de transferência cadastrado no APP."
        }
      }
    }

    // Verifica se algum método de transferência passado é inválido
    for (const method of input.type_of_bank_transfers) {
      if (!available_transfer_methods.includes(method)) {
        return {
          success: false,
          error: {
            trace: "UpdateTransferMethodsBankAccount",
            method: "verification_in_use_case",
            code: "method_not_found",
            message: `Método de transferência '${method}' não encontrado na base de dados!`
          }
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
          // Se não estiver quer dizer que está desabilitado
          is_disabled: !input.type_of_bank_transfers.includes(transfer_method.method)
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