import { BankAccount } from "@core/entities/bank_account.entity";
import IUseCase from "@core/shared/IUseCase";
import { BankAccountNotFoundById, BankAccountUnknownError, isBankAccountNotFoundById } from "@src/core/shared/errors/bank_account";
import { IRepoBankAccount } from "@src/infrastructure/repositories/bank_account.repository";

interface DisableBankAccount_Input {
  id: number,
}

export default class DisableBankAccount implements IUseCase<DisableBankAccount_Input, BankAccount> {
  /**
   * @param {IRepoBankAccount} repo_ba Interface do repositório de BankAccount
   */
  constructor(
    private repo_ba: IRepoBankAccount
  ){}
  /**
   * @param {DisableBankAccount_Input} input objeto contém o id da BankAccount a ser desabilitado
   * @throws {BankAccountNotFoundById}
   * @throws {BankAccountUnknownError}
   * @returns {Promise<BankAccount>} retorna uma promise com um objeto que representa a entidade BankAccount
   */
  async execute(input: DisableBankAccount_Input): Promise<BankAccount> {
    try {
      const bank_account = this.repo_ba.findById(input.id)
  
      bank_account.disable()
  
      const {id, ...bank_account_without_id} = bank_account.properties
      return this.repo_ba.update(id, bank_account_without_id)
    } catch (error) {
      if(isBankAccountNotFoundById(error)){
        throw new BankAccountNotFoundById(input.id)
      }
      throw new BankAccountUnknownError()
    }
  }
}