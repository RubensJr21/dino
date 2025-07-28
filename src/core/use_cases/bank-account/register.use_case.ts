import { BankAccount, IBankAccount } from "@core/entities/bank_account.entity";
import IUseCase from "@core/shared/IUseCase";
import { IRepoBankAccount } from "@src/core/shared/interfaces/IRepoBankAccount";
import { IRepoBankAccountTransferMethod } from "@src/core/shared/interfaces/IRepoBankAccountTransferMethod";
import { IRepoTransferMethod } from "@src/core/shared/interfaces/IRepoTransferMethodType";
import { TypeOfTransferMethods } from "@src/core/shared/types/transfer_methods";

interface Input extends Pick<IBankAccount, "nickname" | "balance"> {
  type_of_bank_transfers: Record<TypeOfTransferMethods, boolean>
}

type UseCaseInterface = IUseCase<Input, BankAccount>

export default class RegisterBankAccount implements UseCaseInterface {
  constructor(
    private repo_ba: IRepoBankAccount,
    private repo_tm: IRepoTransferMethod,
    private repo_ba_tm: IRepoBankAccountTransferMethod
  ) { }
  async execute(input: Input): ReturnType<UseCaseInterface["execute"]> {
    const result_search_nickname = this.repo_ba.findByNickname(input.nickname)

    if(result_search_nickname.success){
      return {
        success: false,
        error: {
          code: "nickname_already_used",
          scope: `RegisterBankAccount(${this.repo_ba.findByNickname.name})`,
          message: `O nickname '${input.nickname}' já está sendo utilizado!`
        }
      }
    }

    const result_create = this.repo_ba.create({
      ...input,
      is_disabled: false,
    })

    if(!result_create.success){
      const scope = `RegisterBankAccount(${this.repo_ba.findByNickname.name}) > ${result_create.error.scope}`
      return {
        success: false,
        error: {
          ...result_create.error,
          scope
        }
      }
    }

    const bank_account_created = result_create.data

    const result_transfer_methods_all = this.repo_tm.findAll()

    if(!result_transfer_methods_all.success){
       const scope = `RegisterBankAccount(${this.repo_tm.findAll.name}) > ${result_transfer_methods_all.error.scope}`
      return {
        success: false,
        error: {
          ...result_transfer_methods_all.error,
          scope
        }
      }
    }

    // Quando um banco é adicionado é necessário popular a tabela de bank_account_transfer_method
    const transfer_methods_data = result_transfer_methods_all.data.map(item => item.method)
    for (const key of transfer_methods_data) {
      // isso será feito na migration da
      const transfer_method_searched = this.repo_tm.findByMethod(key)
      if(!transfer_method_searched.success){
        const scope = `RegisterBankAccount(${this.repo_tm.findByMethod.name}) > ${transfer_method_searched.error.scope}`
        return {
          success: false,
          error: {
            ...transfer_method_searched.error,
            scope
          }
        }
      }

      const transfer_method_data = transfer_method_searched.data
      
      const ba_tm_created = this.repo_ba_tm.create({
        fk_id_bank_account: bank_account_created.id,
        fk_id_transfer_method: transfer_method_data.id,
        is_disabled: input.type_of_bank_transfers[key]
      })

      if(!ba_tm_created.success){
        const scope = `RegisterBankAccount(${this.repo_ba_tm.create.name}) > ${ba_tm_created.error.scope}`
        return {
          success: false,
          error: {
            ...ba_tm_created.error,
            scope
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