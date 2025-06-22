import { BankAccount } from "@core/entities/bank_account.entity";
import IUseCase from "@core/shared/IUseCase";
import { BankAccountNicknameIsAlreadyInUse, BankAccountUnknownError, isBankAccountNotFoundById, isBankAccountNotFoundByNickname } from "@src/core/shared/errors/bank_account";
import { IRepoBankAccount } from "@src/infrastructure/repositories/bank_account.repository";

interface UpdateNicknameBankAccount_Input {
  id: number,
  new_nickname: string
}

export default class UpdateNicknameBankAccount implements IUseCase<UpdateNicknameBankAccount_Input, BankAccount> {
  /**
   * @param {IRepoBankAccount} repo_ba Interface do repositório de BankAccount
   */
  constructor(
    private repo_ba: IRepoBankAccount
  ){}
  /**
   * @param {UpdateNicknameBankAccount_Input} input objeto contém o id e o novo valor para o atributo 'nickname' de BankAccount
   * @throws {BankAccountNicknameIsAlreadyInUse}
   * @throws {BankAccountNotFoundById}
   * @throws {BankAccountUnknownError}
   * @returns {Promise<BankAccount>} retorna uma promise com um objeto que representa a entidade BankAccount
   */
  async execute(input: UpdateNicknameBankAccount_Input): Promise<BankAccount> {
    try {
      const bank_account = this.repo_ba.findByNickname(input.new_nickname)
      if(bank_account.id != input.id){
        throw new BankAccountNicknameIsAlreadyInUse(input.new_nickname)
      }
    } catch (error) {
      if(!isBankAccountNotFoundByNickname(error)){
        throw error
      }
    }
    
    try {
      const bank_account = this.repo_ba.findById(input.id)
  
      bank_account.change_nickname(input.new_nickname)
      const {id, ...bank_account_without_id} = bank_account.properties
      
      return this.repo_ba.update(id, bank_account_without_id)
    } catch (error) {
      if(isBankAccountNotFoundById(error)){
        throw error
      }
      throw new BankAccountUnknownError()
    }
  }
}