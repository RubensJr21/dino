import { RepoInterfaceNames } from "@core-types/enum/RepoInterfaceNames";
import { UnionRepoInterfaces } from "@core-types/UnionRepoInterfaces";
import { UnionRepoInterfacesNames } from "@core-types/UnionRepoInterfacesNames";
import { UseCaseResult } from "@core-types/UseCaseResult";
import IUseCase from "@core/interfaces/IUseCase_v3";
import { BankAccount, IBankAccount } from "@domain/entities/bank_account.entity";
import { IRepoBankAccount } from "@domain/repositories/IRepoBankAccount";
import { IRepoBankAccountTransferMethod } from "@domain/repositories/IRepoBankAccountTransferMethod";
import { IRepoTransferMethod } from "@domain/repositories/IRepoTransferMethod";

interface Input extends Pick<IBankAccount, "nickname" | "balance"> {
  type_of_bank_transfers: Array<string>
}

type UsedRepoInterfaces = UnionRepoInterfaces<[
  IRepoBankAccount,
  IRepoTransferMethod,
  IRepoBankAccountTransferMethod
]>;

type UsedRepoInterfaceNames = UnionRepoInterfacesNames<[
  RepoInterfaceNames.BankAccount,
  RepoInterfaceNames.TransferMethod,
  RepoInterfaceNames.BankAccountTransferMethod
]>;

type Return = UseCaseResult<
  "RegisterBankAccount",
  BankAccount,
  UsedRepoInterfaces,
  UsedRepoInterfaceNames
>

type UseCaseInterface = IUseCase<Input, Return>

export default class RegisterBankAccount implements UseCaseInterface {
  constructor(
    private repo_ba: IRepoBankAccount,
    private repo_tm: IRepoTransferMethod,
    private repo_ba_tm: IRepoBankAccountTransferMethod
  ) { }
  execute(input: Input): ReturnType<UseCaseInterface["execute"]> {
    const result_search_nickname = this.repo_ba.find_by_nickname(input.nickname)

    if (result_search_nickname.success) {
      return {
        success: false,
        error: {
          code: "nickname_already_used",
          trace: "RegisterBankAccount > RepoBankAccount",
          method: "find_by_nickname",
          message: `O nickname '${input.nickname}' já está sendo utilizado!`
        }
      }
    }

    const result_create = this.repo_ba.create({
      ...input,
      is_disabled: false,
    })

    if (!result_create.success) {
      return {
        success: false,
        error: {
          ...result_create.error,
          trace: "RegisterBankAccount > RepoBankAccount"
        }
      }
    }

    const bank_account_created = result_create.data

    const result_transfer_methods_all = this.repo_tm.find_all()

    if (!result_transfer_methods_all.success) {
      return {
        success: false,
        error: {
          ...result_transfer_methods_all.error,
          trace: "RegisterBankAccount > RepoTransferMethod"
        }
      }
    }

    // Quando um banco é adicionado é necessário popular a tabela de bank_account_transfer_method
    const available_transfer_methods = result_transfer_methods_all.data.map((tm) => tm.method)

    // Verifica se nenhum método de transferência foi cadastrado
    if (available_transfer_methods.length === 0) {
      return {
        success: false,
        error: {
          trace: "RegisterBankAccount",
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
            trace: "RegisterBankAccount",
            method: "verification_in_use_case",
            code: "method_not_found",
            message: `Método de transferência '${method}' não encontrado na base de dados!`
          }
        }
      }
    }

    // CASO AS INFORMAÇÕES NÃO ESTEJAM INSERIDAS NO BANCO, OU ESTEJAM DIFERENTES DARÁ ERRO.
    for (const key of available_transfer_methods) {
      const transfer_method_searched = this.repo_tm.find_by_method(key)
      if (!transfer_method_searched.success) {
        return {
          success: false,
          error: {
            ...transfer_method_searched.error,
            trace: "RegisterBankAccount > RepoBankAccountTransferMethod"
          }
        }
      }

      const transfer_method_data = transfer_method_searched.data

      const ba_tm_created = this.repo_ba_tm.create({
        fk_id_bank_account: bank_account_created.id,
        fk_id_transfer_method: transfer_method_data.id,
        // Se não estiver quer dizer que está desabilitado
        is_disabled: !input.type_of_bank_transfers.includes(key)
      })

      if (!ba_tm_created.success) {
        return {
          success: false,
          error: {
            ...ba_tm_created.error,
            trace: "RegisterBankAccount > RepoBankAccountTransferMethod"
          }
        }
      }
    }

    return {
      success: true,
      data: bank_account_created
    }
  }
}