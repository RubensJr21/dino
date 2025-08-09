import { BankAccount, IBankAccount } from "@core/entities/bank_account.entity";
import IUseCase from "@core/shared/IUseCase_v2";
import { IRepoBankAccount } from "@src/core/shared/interfaces/IRepoBankAccount";
import { IRepoBankAccountTransferMethod } from "@src/core/shared/interfaces/IRepoBankAccountTransferMethod";
import { IRepoTransferMethod } from "@src/core/shared/interfaces/IRepoTransferMethod";
import { RepoInterfaceNames } from "@src/core/shared/types/RepoInterfaceNames";
import { TypeOfTransferMethods } from "@src/core/shared/types/transfer_methods";
import { UnionRepoInterfaces } from "@src/core/shared/types/UnionRepoInterfaces";
import { UnionRepoInterfacesNames } from "@src/core/shared/types/UnionRepoInterfacesNames";
import { UseCaseResult } from "@src/core/shared/types/UseCaseResult";

interface Input extends Pick<IBankAccount, "nickname" | "balance"> {
  type_of_bank_transfers: Record<TypeOfTransferMethods, boolean>
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
  async execute(input: Input): ReturnType<UseCaseInterface["execute"]> {
    const result_search_nickname = this.repo_ba.find_by_nickname(input.nickname)

    if(result_search_nickname.success){
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

    if(!result_create.success){
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

    if(!result_transfer_methods_all.success){
      return {
        success: false,
        error: {
          ...result_transfer_methods_all.error,
          trace: "RegisterBankAccount > RepoTransferMethod"
        }
      }
    }

    // Quando um banco é adicionado é necessário popular a tabela de bank_account_transfer_method
    const transfer_methods_data = result_transfer_methods_all.data.map(item => item.method)
    // CASO AS INFORMAÇÕES NÃO ESTEJAM INSERIDAS NO BANCO, OU ESTEJAM DIFERENTES DARÁ ERRO.
    for (const key of transfer_methods_data) {
      // isso será feito na migration da
      const transfer_method_searched = this.repo_tm.find_by_method(key)
      if(!transfer_method_searched.success){
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
        is_disabled: input.type_of_bank_transfers[key]
        // is_disabled: true
      })

      if(!ba_tm_created.success){
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