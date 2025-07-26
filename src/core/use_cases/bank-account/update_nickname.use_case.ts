import { BankAccount } from "@core/entities/bank_account.entity";
import IUseCase from "@core/shared/IUseCase";
import { IRepoBankAccount } from "@src/core/shared/interfaces/IRepoBankAccount";

interface Input {
  id: number,
  new_nickname: string
}

type UseCaseInterface = IUseCase<Input, BankAccount>

export default class UpdateNicknameBankAccount implements UseCaseInterface {
  constructor(private repo_ba: IRepoBankAccount) { }
  async execute(input: Input): ReturnType<UseCaseInterface["execute"]> {
    const result_searched_nickname = this.repo_ba.findByNickname(input.new_nickname)

    if(result_searched_nickname.success){
      const bank_account_data = result_searched_nickname.data
      if(bank_account_data.id !== input.id){
        return {
          success: false,
          error: {
            code: "nickname_already_used",
            scope: `UpdateNicknameBankAccount(${this.repo_ba.findByNickname.name})`,
            message: `O nickname '${input.new_nickname}' já está sendo utilizado!`
          }
        }
      }
    }

    const result_search = this.repo_ba.findById(input.id)

    if(!result_search.success){
      const scope = `UpdateNicknameBankAccount(${this.repo_ba.findById.name}) > ${result_search.error.scope}`
      return {
        success: false,
        error: {
          ...result_search.error,
          scope
        }
      }
    }

    const bank_account_data = result_search.data

    bank_account_data.change_nickname(input.new_nickname)
    const { id, ...bank_account_without_id } = bank_account_data.properties

    const result_update = this.repo_ba.update(id, bank_account_without_id);

    if (!result_update.success) {
      const scope = `UpdateNicknameBankAccount(${this.repo_ba.update.name}) > ${result_update.error.scope}`
      return {
        success: false,
        error: {
          ...result_update.error,
          scope
        }
      }
    }

    return {
      success: true,
      data: result_update.data
    }
  }
}