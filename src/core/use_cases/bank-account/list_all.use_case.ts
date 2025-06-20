import { BankAccount } from "@core/entities/bank_account.entity";
import IUseCase from "@core/shared/IUseCase";
import { IRepoBankAccount } from "@src/infrastructure/repositories/bank_account.repository";

export default class ListAllBankAccounts implements IUseCase<void, BankAccount[]> {
  /**
   * @param {IRepoBankAccount} repo_ba Interface do repositório de BankAccount
   */
  constructor(
    private repo_ba: IRepoBankAccount
  ){}
  /**
   * @returns {Promise<BankAccount[]>} retorna uma promise com uma lista de objetos que representam a entidade BankAccount
   */
  async execute(): Promise<BankAccount[]> {
    return this.repo_ba.findAll();
  }
}