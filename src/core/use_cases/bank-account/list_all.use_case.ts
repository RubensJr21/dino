import { BankAccount } from "@core/entities/bank_account.entity";
import IUseCase from "@core/shared/IUseCase";
import { IRepoBankAccount } from "@src/core/shared/interfaces/IRepoBankAccount";

type UseCaseInterface = IUseCase<void, BankAccount[]>

export default class ListAllBankAccounts implements UseCaseInterface {
  constructor(private repo_ba: IRepoBankAccount) { }
  async execute(): ReturnType<UseCaseInterface["execute"]> {
    const result = this.repo_ba.findAll();
    if (!result.success) {
      return {
        success: false,
        error: {
          ...result.error,
          scope: `ListAllBankAccounts > ${result.error.scope}`
        }
      }
    }

    return {
      success: true,
      data: result.data
    }
  }
}