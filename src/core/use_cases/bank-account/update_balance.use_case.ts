import { BankAccount } from "@core/entities/bank_account.entity";
import IUseCase from "@core/shared/IUseCase";
import { IRepoBankAccount } from "@src/core/shared/interfaces/IRepoBankAccount";

interface Input {
  id: number,
  new_balance: number
}

type UseCaseInterface = IUseCase<Input, BankAccount>

export default class UpdateBalanceBankAccount implements UseCaseInterface {
  constructor(private repo_ba: IRepoBankAccount) { }
  async execute(input: Input): ReturnType<UseCaseInterface["execute"]> {
    const result_search = this.repo_ba.findById(input.id)

    if (!result_search.success) {
      const scope = `UpdateBalanceBankAccount(${this.repo_ba.findById.name}) > ${result_search.error.scope}`
      return {
        success: false,
        error: {
          ...result_search.error,
          scope
        }
      }
    }

    const data = result_search.data

    data.change_balance(input.new_balance);

    const { id, ...bank_account_without_id } = data.properties;

    const result_update = this.repo_ba.update(id, bank_account_without_id);

    if (!result_update.success) {
      const scope = `UpdateBalanceBankAccount(${this.repo_ba.update.name}) > ${result_update.error.scope}`
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