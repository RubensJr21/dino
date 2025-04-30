import { BankAccount } from "@core/entities/bank_account.entity";
import IUseCase from "@core/shared/IUseCase";
import { IRepoBankAccount } from "@infrastructure/repositories/drizzle/bank_account.repository";

export default class ListAllBankAccounts implements IUseCase<void, BankAccount[]> {
  constructor(
    private repo_ba: IRepoBankAccount
  ){}
  async execute(): Promise<BankAccount[]> {
    const banks_account_models = await this.repo_ba.findAll()
    const banks_account = banks_account_models.map(bk_ac => new BankAccount(bk_ac))
    return banks_account;
  }
}