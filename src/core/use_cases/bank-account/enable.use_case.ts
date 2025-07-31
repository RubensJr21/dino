import { BankAccount } from "@core/entities/bank_account.entity";
import IUseCase from "@core/shared/IUseCase";
import { IRepoBankAccount } from "@src/core/shared/interfaces/IRepoBankAccount";

interface Input {
  id: number,
}

type UseCaseInterface = IUseCase<Input, BankAccount>

export default class EnableBankAccount implements UseCaseInterface {
  constructor(private repo_ba: IRepoBankAccount) { }

  async execute(input: Input): ReturnType<UseCaseInterface["execute"]> {
    const result = this.repo_ba.find_by_id(input.id)

    if(!result.success){
      return {
        success: false,
        error: {
          ...result.error,
          scope: `EnableBankAccount > ${result.error.scope}`
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
          scope: `EnableBankAccount > ${bank_account_updated.error.scope}`
        }
      }
    }
    
    return {
      success: true,
      data: bank_account_updated.data
    }
  }
}