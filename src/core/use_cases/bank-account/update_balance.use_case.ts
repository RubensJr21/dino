import { BankAccount } from "@core/entities/bank_account.entity";
import IUseCase from "@core/shared/IUseCase";
import { BankAccountUnknownError, isBankAccountNotFoundById } from "@src/core/shared/errors/bank_account";
import { IRepoBankAccount } from "@src/infrastructure/repositories/bank_account.repository";

interface UpdateBalanceBankAccount_Input {
  id: number,
  new_balance: number
}

export default class UpdateBalanceBankAccount implements IUseCase<UpdateBalanceBankAccount_Input, BankAccount> {
  /**
   * @param {IRepoBankAccount} repo_ba Interface do repositório de BankAccount
   */
  constructor(
    private repo_ba: IRepoBankAccount
  ){}
  /**
   * @param {UpdateBalanceBankAccount_Input} input objeto contém o id e o novo valor para o atributo 'balance' de BankAccount
   * @throws {BankAccountNotFoundById}
   * @throws {BankAccountUnknownError}
   * @returns {Promise<BankAccount>} retorna uma promise com um objeto que representa a entidade BankAccount
   */
  async execute(input: UpdateBalanceBankAccount_Input): Promise<BankAccount> {
    try {
      const bank_account = this.repo_ba.findById(input.id)
      bank_account.change_balance(input.new_balance);
  
      const {id, created_at, updated_at, ...bank_account_without_id} = bank_account.properties;
  
      return this.repo_ba.update(id, bank_account_without_id);
    } catch (error) {
      if(isBankAccountNotFoundById(error)){
        throw error
      }
      throw new BankAccountUnknownError()
    }
  }
}