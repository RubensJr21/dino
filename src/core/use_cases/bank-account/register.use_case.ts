import { BankAccount, IBankAccount } from "@core/entities/bank_account.entity";
import IUseCase from "@core/shared/IUseCase";
import { BankAccountNicknameIsAlreadyInUse, BankAccountUnknownError, isBankAccountNotFoundByNickname } from "@src/core/shared/errors/bank_account";
import { IRepoBankAccount } from "@src/infrastructure/repositories/drizzle/bank_account.repository";
import { IRepoBankAccountTransferMethod } from "@src/infrastructure/repositories/drizzle/bank_account_transfer_method.repository";

interface BankAccount_RegisterInput extends Pick<IBankAccount, "nickname"|"balance"> {
  type_of_bank_transfers: {
    "Pix": boolean,
    "Débito": boolean,
    "Transferência Bancária": boolean
  }
}

export default class RegisterBankAccount implements IUseCase<BankAccount_RegisterInput, BankAccount> {
  /**
   * @param {IRepoBankAccount} repo_ba Interface do repositório de BankAccount
   * @param {IRepoBankAccountTransferMethod} repo_ba_tm Interface do repositório de BankAccountTransferMethod
   */
  constructor(
    private repo_ba: IRepoBankAccount,
    private repo_ba_tm: IRepoBankAccountTransferMethod
  ){}
  /**
   * @param {BankAccount_RegisterInput} input objeto contém o valores que serão usado para criar um novo BankAccount
   * @throws {BankAccountNicknameIsAlreadyInUse}
   * @throws {BankAccountNotFoundByNickname}
   * @throws {BankAccountUnknownError}
   * @returns {Promise<BankAccount>} retorna uma promise com um objeto que representa a entidade BankAccount
   */
  async execute(input: BankAccount_RegisterInput): Promise<BankAccount> {
    try {
      const bank_account = this.repo_ba.findByNickname(input.nickname)
      throw new BankAccountNicknameIsAlreadyInUse(input.nickname)
    } catch (error) {
      if(!isBankAccountNotFoundByNickname(error)){
        throw error
      }
      console.warn(error)
    }
    
    try {
      const bank_account_created = this.repo_ba.create({
        ...input,
        is_disabled: false
      })

      // Quando um banco é adicionado é necessário popular a tabela de bank_account_transfer_method
      Object.entries(input.type_of_bank_transfers).forEach(([key, value]) => {
        this.repo_ba_tm.create({
          fk_id_bank_account: bank_account_created.id,
          type: key,
          is_enable: value
        })
      })

      return new BankAccount(bank_account_created);
    } catch (error) {
      console.log("Algum erro aconteceu!")
      console.error(error)
      throw new BankAccountUnknownError()
    }
  }
}